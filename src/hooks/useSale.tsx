import React, { useContext, useState } from 'react'
import api from '../api/axios';
import { UIContext } from '../context/UIContext';
import { initialState, notificationMessage } from '../helpers/shared';
import { IPaginate } from '../interfaces/IApp';
import { ISale} from '../interfaces/ISaleShop';


export const useSale= () => {
   //loading para el datatable
   const {setLoading} = useContext(UIContext);
     //obtener data de paginación
    const [data, setData] = useState<IPaginate>(initialState);
    //llenar lista
    const [items, setItems] = useState<ISale[]>([]);
    const [item, setItem] = useState<ISale>();
    
    //lista inicial de data
    const getAll = async(page=0,search ='') => {
        setLoading(true);
        await api.get<IPaginate>('/sales?page='+page+'&search='+search).then(r=> {
            setData(r.data);
            setItems(r.data.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

    //obtener app message por id
    const getById = async(id:number) => {
        await api.get(`/sales/${id}`).then(r=> {
            setItem(r.data);
        }).catch(e=>{
            
        });
    } 

    //crear registro
    const create = async(data: ISale) => {
        let resp = false;
        setLoading(true);
        await api.post(`/sales`, data).then(r=> {
            notificationMessage('success','Éxito','Venta realizada con éxito');
            resp = true;
        }).catch(e=>{
            notificationMessage('error','Error',e.error);
        });
        setLoading(false);
        return resp;
    }

    //actualizar registro
    const update = async(data: ISale) => {
        let resp = false;
        setLoading(true);
        await api.post(`/sales-update`,data).then(r=> {
            notificationMessage('success','Éxito','Venta actualizada con éxito');
            resp = true;
        }).catch(e=>{
            notificationMessage('error','Error',e.error);
        });
        setLoading(false);
        return resp;
    }

    //eliminar registro
    const remove = async(id:number) => {
        let resp = false;
        setLoading(true);
        await api.delete<IPaginate>(`/sales/${id}`).then(r=> {
            notificationMessage('success','Éxito','Venta anulada con éxito');
            resp = true;
        }).catch(e=>{
            notificationMessage('error','Error',e.error);
        });
        setLoading(false);
        return resp;
    }

   //capturar cambio de paginación
   const onChangePag = (current: number, size:number) => {
        getAll(current);
    }

    return {
        items,
        onChangePag,
        data,
        create,
        update,
        remove,
        getAll,
        getById,
        item
    }
}
