import { createContext, useState } from "react";
import moment from 'moment'

export interface ReportContextProps {
    filter: {from: string,to: string};
    setFilter: (action: {from: string, to: string}) => void;
}

//crear context
export const RContext = createContext({} as ReportContextProps);
//crear el provider
export const RProvider = ({ children }: any) => {
    const [filter, setFilter] = useState({
        from: moment().format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
    });


    return (
        <RContext.Provider value={{
            filter,
            setFilter
        }}>
            {children}
        </RContext.Provider>
    )
}


