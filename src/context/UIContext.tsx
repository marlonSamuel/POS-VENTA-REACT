import {createContext, useState} from 'react';
import { IBreadCrub } from '../components/shared/BreadCrubPage';

//interface con los atributos necesarios para manejar el ui context
export interface UIContextProps {
    loading: boolean,
    setLoading: (action: boolean) => void;
    routesBC: IBreadCrub[],
    setRoutesBC: (action: IBreadCrub[]) => void;
}
//crear context
export const UIContext = createContext({} as UIContextProps);
//crear el provider
export const UIProvider = ({ children }: any) => {
    //definir los estados necesarios para el ui
    const [loading, setLoading] = useState(false);
    const [routesBC, setRoutesBC] = useState<IBreadCrub[]>([]);

    return (
        <UIContext.Provider value={{
            loading,
            setLoading,
            routesBC,
            setRoutesBC
        }}>
            {children}
        </UIContext.Provider>
    )
}
