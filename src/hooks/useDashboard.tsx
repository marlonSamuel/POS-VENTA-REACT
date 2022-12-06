import React, { useContext, useState } from 'react'
import api from '../api/axios';
import { UIContext } from '../context/UIContext';
import { IDashboardResumen } from '../interfaces/ISaleShop';


export const useDashboard = () => {
   //loading para el datatable
   const {setLoading} = useContext(UIContext);

   const [dashR, setDashR] = useState<IDashboardResumen>({
    products: 0,
    sales: 0,
    purchases: 0,
    incomes: 0,
    outcomes: 0
   });

   const [sales, setSales] = useState([]);
   const [purchases, setPurchases] = useState([]);

    //lista inicial de data sin paginación
    const getAll = async(page=0) => {
        setLoading(true);
        await api.post<IDashboardResumen>('/dashboard').then(r=> {
            setDashR(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    }

    const getSales = async() => {
        setLoading(true);
        await api.post('/dashboard-sales').then(r=> {
            setSales(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    }

    const getPurchases = async() => {
        setLoading(true);
        await api.post('/dashboard-purchases').then(r=> {
            setPurchases(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    }

    return {
        getAll,
        dashR,
        getSales,
        sales,
        getPurchases,
        purchases
    }
}
