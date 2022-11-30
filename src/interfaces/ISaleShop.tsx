import { IProvider } from "./IConf";
import { IRawMaterial } from "./IInventory";

export interface IShopDetail {
    raw_material_id: number;
    quantity: number;
    material_name?: string;
    image: string;
    purchase_price: number;
    stock: number;
    discount: number;
    raw_material?: IRawMaterial
}

export interface IPurcharse {
    id: number;
    date: Date;
    provider_id: number;
    detail: IShopDetail[];
    description: string;
    total: number;
    invoice: string;
    provider: IProvider
}