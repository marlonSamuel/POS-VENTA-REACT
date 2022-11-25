import { Popconfirm, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/axios';
import { UIContext } from '../context/UIContext';
import { initialState, notificationMessage } from '../helpers/shared';
import { IPaginate } from '../interfaces/IApp';
import { IProduct } from '../interfaces/IInventory';


export const _initialState : IProduct = {
    id: 0,
    name: '',
    description: '',
    photo: '',
    price: 0.00,
    cost_price: 0.00,
    stock: 1,
    category_product_id: 0,
    detail: []
  }

export const useProduct = () => {
   //loading para el datatable
   const {setLoading} = useContext(UIContext);
     //obtener data de paginación
    const [data, setData] = useState<IPaginate>(initialState);
    //llenar lista
    const [items, setItems] = useState<IProduct[]>([]);
    const [item, setItem] = useState<IProduct>(_initialState);
    
    //lista inicial de data
    const getAll = async(page=0,search ='') => {
        setLoading(true);
        await api.get<IPaginate>('/productss?page='+page+'&search='+search).then(r=> {
            setData(r.data);
            setItems(r.data.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

    //obtener app message por id
    const getById = async(id:number) => {
        await api.get(`/productss/${id}`).then(r=> {
            setItem(r.data);
        }).catch(e=>{
            
        });
    } 

    //crear registro
    const create = async(data: any) => {
        let resp = false;
        setLoading(true);
        await api.post(`/productss`, data).then(r=> {
            notificationMessage('success','Éxito','Producto creado con éxito');
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
        await api.post(`/productss-update`,data).then(r=> {
            notificationMessage('success','Éxito','Producto actualizado con éxito');
            resp = true;
        }).catch(e=>{
            notificationMessage('error','Error',e.error);
        });
        setLoading(false);
        return resp;
    }

    //actualizar registro
    const updateStock = async(data: any) => {
        let resp = false;
        setLoading(true);
        await api.post(`/productss-add-or-decrease`,data).then(r=> {
            notificationMessage('success','Éxito','Stock '+(data.option === 'a' ? 'aumentado' : 'disminuido')+ ' en una unidad');
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
        await api.delete<IPaginate>(`/productss/${id}`).then(r=> {
            notificationMessage('success','Éxito','Producto eliminado con éxito');
            resp = true;
        }).catch(e=>{
            notificationMessage('error','Error',e.error);
        });
        setLoading(false);
        return resp;
    }

    //capturar cambio de paginación
    const onChangePag = (current: number, search?:string) => {
        getAll(current,search);
    }

    return {
        items,
        onChangePag,
        data,
        create,
        update,
        updateStock,
        remove,
        getAll,
        getById,
        item
    }
}
