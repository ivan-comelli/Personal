import { UniqueTitleType } from "./uniqueTitle.interface";


export interface PurchasesListModelInterface extends PurchaseListType {
    uniqueTitle: UniqueTitleType,
    purchases: PurchaseInputCatalogType[]
}
// Falta los typos de inputCatalog dentro de purchases

export type PurchaseListType = {
    id?: number,
    amountAvailable: number,
    uniqueTitleId: number | null,
    createdAt: Date
}

export type PurchaseInputCatalogType = {
    id?: number;
    quantity: number | null;
    cost: number;
    purchaseListId: number;
    inputCatalogId: number;
}