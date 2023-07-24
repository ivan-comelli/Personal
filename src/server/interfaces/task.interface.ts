import { WorkPlanModelInterface, WorkPlanType } from "./workPlan.interface"

export interface TaskModelInterface extends TaskType {
    subTasks?: SubTaskType[],
    workPlans?: WorkPlanModelInterface
}

export type TaskType = {
    id: number;
    name: string;
    description: string | null;
    index: number;
    breakpoint: boolean;
    doing: boolean | null;
    timeCost: number;
    workPlanId: number | null;
}

export type SubTaskType = {
    id: number;
    name: string;
    description: string | null;
    index: number;
    breakpoint: boolean;
    doing: boolean | null;
    timeCost: number;
    taskId: number | null;
}