import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/decorator';
import { CreateUserDto } from './user-create.dto';
import { ICreateUserResult } from 'src/interface';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private userService: UserService
  ) { }

  @Public()
  @Post('create')
  @ApiCreatedResponse({ type: () => ICreateUserResult })
  create(@Body() dto: CreateUserDto): Promise<ICreateUserResult> {
    return this.userService.create(dto);
  }
}
