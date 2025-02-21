import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator';
import { CreateUserDto } from 'src/user/user-create.dto';
import { IAuthToken, BadRequestError, OtherError } from 'src/interface';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Public()
  @Post()
  @ApiCreatedResponse({ type: () => IAuthToken })
  @ApiNotFoundResponse({ type: () => OtherError })
  @ApiUnauthorizedResponse({ type: () => OtherError })
  @ApiBadRequestResponse({ type: () => BadRequestError })
  async auth(@Body() creds: CreateUserDto): Promise<IAuthToken> {
    return this.authService.login(creds);
  }
}
