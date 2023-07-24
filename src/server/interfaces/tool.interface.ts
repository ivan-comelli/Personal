import { InputCatalogModelInterface } from "./inputCatalog.interface";
import { WorkPlanModelInterface } from "./workPlan.interface";

export interface ToolModelInterface extends ToolType {
    workPlans?: WorkPlanModelInterface[],
    inputCatalog?: InputCatalogModelInterface[]
}

export type ToolType = {
    id?: number;
    name: string;
    index: number;
    upkeepCost: number;
    breakpoint: boolean;
    fix: boolean;
    workPlanId: number;
    inputCatalogId: number;
}