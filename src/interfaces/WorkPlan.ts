export interface WorkPlanInterface extends WorkPlanModelInterface{
    tasks: Array<TasksType>,
    tools: Array<ToolsType>,
    materials: Array<MaterialsType>
}

export interface WorkPlanModelInterface {
    id: number,
    workName: string,
    startDate: string,expirationDate: string,
    totalTime: number,
    workDays: number,
    fidelityPercentage: number,
    note: string,
}


export type TasksType = {
    id: number | undefined,
    title: string | undefined,
    breakpoint: boolean,
    index: number,
    workPlanId: number
}

export type ToolsType = {
    id: number | undefined,
    name: string | undefined,
    breakpoint: boolean,
    fix: boolean,
    index: number,
    workPlanId: number
}

export type MaterialsType = {
    id: number | undefined,
    name: string | undefined,
    fix: boolean,
    index: number,
    workPlanId: number
}