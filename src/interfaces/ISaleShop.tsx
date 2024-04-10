import { IProvider } from "./IConf";
import { IProduct, IRawMaterial } from "./IInventory";

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

export interface ISaleDetail {
    product_id: number;
    quantity: number;
    product_name?: string;
    image: string;
    sale_price: number;
    stock: number;
    product?: IProduct;
    discount: number;
}

export interface ISale {
    id: number;
    date: Date;
    detail: ISaleDetail[];
    description: string;
    total: number;
    discounted: boolean;
    discount_reason: string;
    client_id: number;
}

export interface IMovement {
    id: number;
    date: string;
    description: string;
    price: number;
    movement_type: string;
}

export interface IClient {
    id: number;
    names: string;
    last_names: string;
    birthday: Date;
    cui: string;
    nit: string;
    cellphone: string;
    email: string;
    dir: string;
}

export interface IDashboardResumen {
    sales: number;
    purchases: number;
    incomes: number;
    outcomes: number;
    products: number;
}