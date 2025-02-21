import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository, TypeORMError } from 'typeorm';
import { CreateUserDto } from './user-create.dto';
import { ICreateUserResult, IPasswordHash } from 'src/interface';
import * as crypto from 'crypto';
import { Const } from 'src/constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) { }

  async checkHash(inputPassword: string, user: User): Promise<boolean> {
    const { pass_hash } = await this.getHash(inputPassword, user.pass_salt);
    return !!crypto.timingSafeEqual(
      Buffer.from(pass_hash),
      Buffer.from(user.pass_hash)
    );
  }

  async create(dto: CreateUserDto): Promise<ICreateUserResult> {
    const hashAndSalt = await this.getHash(dto.pass);

    try {
      const inserted = await this.userRepo.insert({ login: dto.login, ...hashAndSalt });
      return { id: inserted.generatedMaps[0].id };
    } catch (err) {
      console.log({ err });
      throw new ConflictException([Const.err.USER_EXISTS]);
    }
  }

  async findOne(dto: CreateUserDto): Promise<User | null> {
    return await this.userRepo.findOne({ where: { login: dto.login } });
  }

  getHash(pass: string, salt?: string): Promise<IPasswordHash> {
    return new Promise((resolve, reject) => {
      const pass_salt = salt || crypto.randomBytes(10).toString('hex');
      crypto.pbkdf2(
        pass,
        Buffer.from(pass_salt),
        310000,
        32,
        'sha512',
        (_err, hash: Buffer) => {
          if (_err) reject([new InternalServerErrorException()]);
          resolve({ pass_hash: hash.toString('hex'), pass_salt });
        }
      );
    });
  }

}
