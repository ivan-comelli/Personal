import { UniqueTitleModel } from '@models/uniqueTitle.model';
import { FeeModel } from '@models/fee.model';
import { TaskModel } from '@models/task.model';
import { ToolModel } from '@models/tool.model';
import { SupplyModel } from '@models/supply.model';


export interface WorkPlanModelInterface extends WorkPlanType {
    title?: string,
    percentage?: number,
    uniqueTitle?: UniqueTitleModel,
    fee?: FeeModel,
    tasks?: TaskModel[],
    tools?: ToolModel[],
    supplies?: SupplyModel[]
}

export type WorkPlanType = {
    id?: number;
    partIndex: number;
    partName: string;
    startDate: string | null;
    expirationDate: string | null;
    timeCost: number | null;
    workDays: number | null;
    totalAmount: number | null;
    note: string | null;
    feeId: number;
    uniqueTitleId: number;
}