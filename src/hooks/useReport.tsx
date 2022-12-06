import { Popconfirm, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/axios';
import { RContext } from '../context/ReportContext';
import { UIContext } from '../context/UIContext';
import { initialState, notificationMessage } from '../helpers/shared';
import { IPaginate } from '../interfaces/IApp';
import { IProvider } from '../interfaces/IConf';
import { IMovement, IPurcharse, ISale } from '../interfaces/ISaleShop';


export const useReport = () => {
   //loading para el datatable
   const {setLoading} = useContext(UIContext);
   const {filter} = useContext(RContext);
    //llenar lista
    const [sales, setSales] = useState({
        data: [],
        quantity: 0,
        total: 0
    });
    const [purchases, setPurchases] = useState({
        data: [],
        quantity: 0,
        total: 0
    });
    const [movements, setMovements] = useState({
        data: [],
        quantity_i: 0,
        quantity_o: 0,
        total_i: 0,
        total_o: 0
    });

    const [balance, setBalance] = useState({
        sales: {
            quantity: 0,
            total: 0
        },
        purchases: {
            quantity: 0,
            total: 0
        },
        movements: [
            {
                movement_type: "i",
                quantity: 0,
                total: 0
            },
            {
                movement_type: "o",
                quantity: 0,
                total: 0
            }
        ]
    });
    
    //lista inicial de data sin paginación
    const getSales = async() => {
        setLoading(true);
        await api.post('/reports-sales',filter).then(r=> {
            setSales(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    }

    const getPurchases = async() => {
        setLoading(true);
        await api.post('/reports-purchases',filter).then(r=> {
            setPurchases(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    }

    const getMovements = async() => {
        setLoading(true);
        await api.post('/reports-movements',filter).then(r=> {
            setMovements(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    }

    const getBalance = async() => {
        setLoading(true);
        await api.post('/reports-balance',filter).then(r=> {
            if(r.data.movements.length == 0){
                r.data.movements = [
                    {
                        movement_type: "i",
                        quantity: 0,
                        total: 0
                    },
                    {
                        movement_type: "o",
                        quantity: 0,
                        total: 0
                    }
                ] 
            }
            setBalance(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    }

    return {
        sales,
        getSales,
        purchases,
        getPurchases,
        movements,
        getMovements,
        balance,
        getBalance
    }
}
