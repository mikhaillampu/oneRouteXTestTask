import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Const } from 'src/constant';

export class CreateTaskDTO {
  @ApiProperty({ minLength: 3, maxLength: Const.TITLE_LENGTH })
  @IsString()
  @IsNotEmpty()
  @Length(3, Const.TITLE_LENGTH)
  title: string;

  @ApiProperty({ minLength: 3, maxLength: Const.DESC_LENGTH })
  @IsString()
  @IsOptional()
  @Length(3, Const.DESC_LENGTH)
  description: string;
}