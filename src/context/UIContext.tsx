import {createContext, useState} from 'react';

export interface UIContextProps {
    loading: boolean,
    setLoading: (action: boolean) => void;
}

export const UIContext = createContext({} as UIContextProps);

export const UIProvider = ({ children }: any) => {

    const [loading, setLoading] = useState(false);

    return (
        <UIContext.Provider value={{
            loading,
            setLoading
        }}>
            {children}
        </UIContext.Provider>
    )
}
