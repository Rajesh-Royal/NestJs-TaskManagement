import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    // public getAllTasks(): Task[] {
    //     return this.tasks;
    // }

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

    // public updateTaskStatus(id: string, status: TaskStatus): Task{
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    // public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if(search){
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) || task.description.includes(search)
    //             )
    //     }

    //     return tasks;
    // }
}
