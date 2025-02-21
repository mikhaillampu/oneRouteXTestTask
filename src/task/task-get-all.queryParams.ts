import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { TASK_STATUS } from 'src/enum';

export class GetAllTasksQueryParams {
  @IsEnum(TASK_STATUS)
  @IsOptional()
  @ApiPropertyOptional({ enum: () => TASK_STATUS })
  status?: TASK_STATUS;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  offset?: number;
}