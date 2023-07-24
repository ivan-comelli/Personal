import { WorkPlanModelInterface } from "./workPlan.interface";
import { InputCatalogModelInterface } from "./inputCatalog.interface";

export interface SupplyModelInterface extends SupplyType {
    workPlans?: WorkPlanModelInterface,
    inputCatalog?: InputCatalogModelInterface
}

export type SupplyType = {
    id?: number;
    name: string;
    index: number;
    quantity: number | null;
    cost: number;
    workPlanId: number;
    inputCatalogId: number;
}