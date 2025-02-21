import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Task } from 'src/entity/task.entity';

export class AllTasksResponse {
  @ApiProperty({isArray: true, type: ()=>Task})
  tasks: Task[]

  @ApiPropertyOptional({
    description: `Is presented in server response only when
    limit query param has been passed in request
    and tasks amount is higher than that limit`
  })
  nextOffset?: number;
}