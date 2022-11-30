import { Popconfirm, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/axios';
import { UIContext } from '../context/UIContext';
import { initialState, notificationMessage } from '../helpers/shared';
import { IPaginate } from '../interfaces/IApp';
import { IProduct } from '../interfaces/IInventory';
import { IPurcharse } from '../interfaces/ISaleShop';


export const usePurcharse = () => {
   //loading para el datatable
   const {setLoading} = useContext(UIContext);
     //obtener data de paginación
    const [data, setData] = useState<IPaginate>(initialState);
    //llenar lista
    const [items, setItems] = useState<IPurcharse[]>([]);
    const [item, setItem] = useState<IPurcharse>();
    
    //lista inicial de data
    const getAll = async(page=0,search ='') => {
        setLoading(true);
        await api.get<IPaginate>('/purchases?page='+page+'&search='+search).then(r=> {
            setData(r.data);
            setItems(r.data.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

    //obtener app message por id
    const getById = async(id:number) => {
        await api.get(`/purchases/${id}`).then(r=> {
            setItem(r.data);
        }).catch(e=>{
            
        });
    } 

    //crear registro
    const create = async(data: any) => {
        let resp = false;
        setLoading(true);
        await api.post(`/purchases`, data).then(r=> {
            notificationMessage('success','Éxito','Compra realizada con éxito');
            resp = true;
        }).catch(e=>{
            notificationMessage('error','Error',e.error);
        });
        setLoading(false);
        return resp;
    }

    //actualizar registro
    const update = async(data: any) => {
        let resp = false;
        setLoading(true);
        await api.post(`/purchases-update`,data).then(r=> {
            notificationMessage('success','Éxito','Producto actualizado con éxito');
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
        await api.delete<IPaginate>(`/purchases/${id}`).then(r=> {
            notificationMessage('success','Éxito','Compra eliminada con éxito');
            resp = true;
        }).catch(e=>{
            notificationMessage('error','Error',e.error);
        });
        setLoading(false);
        return resp;
    }

    //capturar cambio de paginación
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
