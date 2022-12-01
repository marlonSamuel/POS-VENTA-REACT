import { createContext, useState } from "react";
import { notificationMessage } from "../../helpers/shared";
import { IProduct } from "../../interfaces/IInventory";
import { ISaleDetail } from "../../interfaces/ISaleShop";

export interface SaleContextProps {
    isSale: boolean;
    setIsSale: (action: boolean) => void;
    addProduct: (action: IProduct) => void;
    removeProduct: (action: ISaleDetail) => void;
    items: ISaleDetail[];
    setItems: (action: ISaleDetail[]) => void;
}

/* export const initialState: ISaleState = {
    logged: false,
    user: null,
    errorMessage: '',
    token: null
}; */

//crear context
export const SAContext = createContext({} as SaleContextProps);
//crear el provider
export const SAProvider = ({ children }: any) => {
    const [isSale, setIsSale] = useState(false);
    const [items, setItems] = useState<ISaleDetail[]>([]);

    const addProduct = (item: IProduct) => {
        const exists = items?.some(x=>x.product_id == item.id);
        if(!exists){
            setItems([...items, {
                product_id: item.id,
                product_name: item.name,
                quantity: 1,
                image: item.photo!,
                sale_price: item.price,
                stock: item.stock!,
                discount: 0
            }]);

            notificationMessage('info','Información',item.name+' agregado a venta');
        }
    }

    const removeProduct = (item: ISaleDetail) => {
        setItems(items.filter(x=>x.product_id !== item.product_id));
    }
    return (
        <SAContext.Provider value={{
            isSale,
            setIsSale,
            items,
            setItems,
            addProduct,
            removeProduct
        }}>
            {children}
        </SAContext.Provider>
    )
}

