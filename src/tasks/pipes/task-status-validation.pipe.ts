/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
    ];

    transform(value: any){
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is and invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}