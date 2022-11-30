import { createContext, useContext, useEffect, useReducer, useState } from "react";
import  api  from "../../api/axios";
import { notificationMessage } from "../../helpers/shared";
import { IUser, IAuthData, ILoginData } from "../../interfaces/IAuth";
import { IRawMaterial } from "../../interfaces/IInventory";
import { IShopDetail } from "../../interfaces/ISaleShop";
import { UIContext } from "../UIContext";

export interface ShopContextProps {
    isShop: boolean;
    setIsShop: (action: boolean) => void;
    addRawMaterial: (action: IRawMaterial) => void;
    removeRawMaterial: (action: IShopDetail) => void;
    items: IShopDetail[];
    setItems: (action: IShopDetail[]) => void;
}

/* export const initialState: IShopState = {
    logged: false,
    user: null,
    errorMessage: '',
    token: null
}; */

//crear context
export const SPContext = createContext({} as ShopContextProps);
//crear el provider
export const SPProvider = ({ children }: any) => {
    const [isShop, setIsShop] = useState(false);
    const [items, setItems] = useState<IShopDetail[]>([]);

    const addRawMaterial = (item: IRawMaterial) => {
        const exists = items?.some(x=>x.raw_material_id == item.id);
        if(!exists){
            setItems([...items, {
                raw_material_id: item.id,
                material_name: item.name,
                quantity: 1,
                image: item.image!,
                purchase_price: item.price,
                stock: item.stock!,
                discount: 0
            }]);
            notificationMessage('info','Información',item.name+' agregado a orden de compra');
        }
    }

    const removeRawMaterial = (item: IShopDetail) => {
        setItems(items.filter(x=>x.raw_material_id !== item.raw_material_id));
    }
    return (
        <SPContext.Provider value={{
            isShop,
            setIsShop,
            items,
            setItems,
            addRawMaterial,
            removeRawMaterial
        }}>
            {children}
        </SPContext.Provider>
    )
}

