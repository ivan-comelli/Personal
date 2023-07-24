import { WorkPlanModelInterface, WorkPlanType } from "./workPlan.interface";
import { InputCatalogType } from "./inputCatalog.interface";

export interface FeeModelInterface extends FeeType {
     workPlans?: WorkPlanModelInterface[]
     inputCatalog?: InputCatalogType[]
}

export type FeeType = {
    id?: number;
    title: string;
    percentage: number | null;
    updated_at: Date;
}