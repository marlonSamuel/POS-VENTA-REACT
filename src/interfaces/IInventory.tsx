export interface IRawMaterial {
    id: number;
    name: string;
    description: string;
    image?: string;
    price: number;
    stock?: number;
}

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    cost_price: number;
    stock: number;
    category_product_id: number;
    photo: string;
    updated_at: Date;
    created_at: Date;
}