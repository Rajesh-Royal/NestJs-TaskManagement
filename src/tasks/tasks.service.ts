import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    public async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
       return await this.taskRepository.getTasks(filterDto);
    }

    public async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with the id: ${id} not found`);
        }

        return found;
    }


    public async createTask(createTaskDto: CreateTaskDto) : Promise<Task> {
       return await this.taskRepository.createTask(createTaskDto);
    }

    public async deleteTask(id: number): Promise<boolean> {
        const result = await this.taskRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Task with the id: ${id} not found`)
        }

        return true;
    }

    public async updateTaskStatus(id: number, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

}
