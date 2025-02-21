import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entity/task.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './task-create.dto';
import { GetAllTasksQueryParams } from './task-get-all.queryParams';
import { Const } from 'src/constant';
import { UpdateTaskDto } from './task-update.dto';
import { AllTasksResponse } from './task-get-all.response';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private repo: Repository<Task>,
    @Inject(UserService) private userService: UserService
  ) { }

  async createTask(userId: number, dto: CreateTaskDTO): Promise<Task> {
    const task = await this.repo.insert({ ...dto, userId });
    return task.raw[0];
  }

  async deleteTask(userId: number, id: number): Promise<true> {
    const { affected } = await this.repo.delete({ userId, id });

    if (!affected) throw new NotFoundException(Const.err.TASK_NOT_FOUND);

    return true;
  }

  async getAll(userId: number, qParams?: GetAllTasksQueryParams): Promise<AllTasksResponse> {
    let { status, limit, offset } = qParams || {};
    const tasks = await this.repo.find({
      where: {
        userId,
        ...status && { status }
      }
    });
    offset ||= 0;
    limit ||= tasks.length;
    const nextOffset = limit + offset;
    return {
      /**
       * Not best for memory consumption, but suitable for test issue
       */
      tasks: tasks.slice(offset, nextOffset),
      /**
       * If limit param was passed and not all tasks are in output,
       * then we add nextOffset for frontend to use in next query.
       */
      ...(qParams?.limit &&
        nextOffset < tasks.length) && {
        nextOffset
      }
    };
  }

  async getOne(userId: number, id: number): Promise<Task> {
    const task = await this.repo.findOneBy({ id, userId });
    if (!task) throw new NotFoundException([Const.err.TASK_NOT_FOUND]);
    return task;
  }

  async updateTask(userId: number, id: number, dto: UpdateTaskDto): Promise<Task> {
    let task = await this.repo.findOneBy({ id, userId });
    if (!task) throw new NotFoundException([Const.err.TASK_NOT_FOUND]);

    /**
     * Here we update task properties using destructuring
     * thus guarantee that dto's properties will substitute
     * current task's ones.
     */
    task = { ...task, ...dto };
    await this.repo.save(task);
    return task;
  }
}
