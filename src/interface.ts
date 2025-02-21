import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from './entity/user.entity';

export class IAuthToken {
  @ApiProperty()
  token: string;
}

export interface IPasswordHash {
  pass_hash: string;
  pass_salt: string;
}

export class ICreateUserResult {
  @ApiProperty()
  id: number;
}

export type IRequest = Request & { user: User; };

export class BadRequestError {
  @ApiProperty({ type: 'string', isArray: true })
  message: string[];

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}

export class OtherError {
  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  error: string;

  @ApiProperty()
  statusCode: number;
}