import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entity/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UserModule
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
