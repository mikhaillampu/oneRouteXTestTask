import { BadRequestException, Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './task-create.dto';
import { Task } from 'src/entity/task.entity';
import { GetAllTasksQueryParams } from './task-get-all.queryParams';
import { UpdateTaskDto } from './task-update.dto';
import { Const } from 'src/constant';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AllTasksResponse } from './task-get-all.response';
import { BadRequestError, OtherError, IRequest } from 'src/interface';

@ApiBearerAuth('access-token')
@Controller('tasks')
export class TaskController {
  constructor(
    @Inject(TaskService) private service: TaskService
  ) { }

  @ApiBody({ type: () => CreateTaskDTO })
  @ApiCreatedResponse({ type: () => Task })
  @ApiUnauthorizedResponse({ type: () => OtherError })
  @Post()
  createTask(@Body() dto: CreateTaskDTO, @Req() req: IRequest): Promise<Task> {
    return this.service.createTask(req.user.id, dto);
  }

  @ApiOkResponse({ type: () => AllTasksResponse })
  @ApiUnauthorizedResponse({ type: () => OtherError })
  @Get()
  getAllTasks(@Req() req: IRequest, @Query() qParams?: GetAllTasksQueryParams): Promise<AllTasksResponse> {
    return this.service.getAll(req.user.id, qParams);
  }

  @ApiOkResponse({ type: () => Task })
  @ApiUnauthorizedResponse({ type: () => OtherError })
  @ApiNotFoundResponse({ type: () => OtherError })
  @Get('/:id')
  getTaskById(@Req() req: IRequest, @Param('id') id: number): Promise<Task> {
    return this.service.getOne(req.user.id, id);
  }

  @Put('/:id')
  @ApiBody({ type: () => UpdateTaskDto })
  @ApiOkResponse({ type: () => Task })
  @ApiUnauthorizedResponse({ type: () => OtherError })
  @ApiNotFoundResponse({ type: () => OtherError })
  @ApiBadRequestResponse({ type: () => BadRequestError })
  updateTaskById(@Req() req: IRequest, @Param('id') id: number, @Body() dto: UpdateTaskDto): Promise<Task> {
    if (!Object.keys(dto || {}).length) throw new BadRequestException([Const.err.UPDATE_IMPOSSIBLE]);
    return this.service.updateTask(req.user.id, id, dto);
  }

  @Delete('/:id')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: () => OtherError })
  @ApiNotFoundResponse({ type: () => OtherError })
  deleteTask(@Req() req: IRequest, @Param('id') id: number): Promise<true> {
    return this.service.deleteTask(req.user.id, id);
  }
}
