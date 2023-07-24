import { FeeType } from "./fee.interface";
import { PurchaseInputCatalogType } from "./purchaseList.interface";

export interface InputCatalogModelInterface extends InputCatalogType {
    fee: FeeType,
    purchases: PurchaseInputCatalogType[]
}

export type InputCatalogType = {
    id?: number;
    name: string;
    unitCost: number;
    units: number;
    bulkCost: number;
    feeId: number;
    updatedAt: Date;
}