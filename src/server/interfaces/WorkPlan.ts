export interface WorkPlanInterface extends WorkPlanModelInterface{
    tasks: Array<TasksType>,
    tools: Array<ToolsType>,
    materials: Array<MaterialsType>
}

export interface WorkPlanModelInterface {
    id: number | undefined,
    workname: string,
    startdate: string,
    expirationdate: string,
    totaltime: number,
    workdays: number,
    fidelitypercentage: number,
    note: string,
}


export type TasksType = {
    id: number | undefined,
    title: string | undefined,
    breakpoint: boolean,
    index: number, 
    workplanid: number | undefined
}

export type ToolsType = {
    id: number | undefined,
    name: string | undefined,
    breakpoint: boolean,
    fix: boolean,
    index: number,
    workplanid: number | undefined
}

export type MaterialsType = {
    id: number | undefined,
    name: string | undefined,
    fix: boolean,
    index: number,
    workplanid: number | undefined
}