import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Const } from 'src/constant';
import { IAuthToken } from 'src/interface';
import { CreateUserDto } from 'src/user/user-create.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(JwtService) public jwtService: JwtService,
  ) { }

  async login(creds: CreateUserDto): Promise<IAuthToken> {
    const user = await this.userService.findOne(creds);

    if (!user) throw new NotFoundException([Const.err.USER_NOT_FOUND]);

    const passIsOk = await this.userService.checkHash(creds.pass, user);
    if (!passIsOk) throw new UnauthorizedException();

    return { token: this.jwtService.sign({ id: user.id }) };
  }


}
