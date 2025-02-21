import { TASK_STATUS } from 'src/enum';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Const } from 'src/constant';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ minLength: 3, maxLength: Const.TITLE_LENGTH })
  @IsString()
  @IsOptional()
  @Length(3, Const.TITLE_LENGTH)
  title: string;

  @ApiPropertyOptional({ minLength: 3, maxLength: Const.DESC_LENGTH })
  @IsString()
  @IsOptional()
  @Length(3, Const.DESC_LENGTH)
  description: string;

  @ApiPropertyOptional({ enum: () => TASK_STATUS })
  @IsEnum(TASK_STATUS)
  @IsOptional()
  status?: TASK_STATUS;
}