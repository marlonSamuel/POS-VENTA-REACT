import { Popconfirm, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/axios';
import { UIContext } from '../context/UIContext';
import { initialState, notificationMessage } from '../helpers/shared';
import { IPaginate } from '../interfaces/IApp';
import { ICategoryProduct } from '../interfaces/IConf';


export const useCategoryProduct = () => {
   //loading para el datatable
   const {setLoading} = useContext(UIContext);
     //obtener data de paginación
    const [data, setData] = useState<IPaginate>(initialState);
    //llenar lista
    const [items, setItems] = useState<ICategoryProduct[]>([]);
    
    //lista inicial de data
    const getAll = async(page=0) => {
        setLoading(true);
        await api.get<IPaginate>('/category-products?page='+page).then(r=> {
            setData(r.data);
            setItems(r.data.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

        //lista inicial de data sin paginación
        const _getAll = async(page=0) => {
            setLoading(true);
            await api.get('/category-products-all').then(r=> {
                setItems(r.data);
            }).catch(e=>{
                
            });
            setLoading(false);
        }

    //obtener app message por id
    const getById = async(id:number) => {
        await api.get<IPaginate>(`/category-products/${id}`).then(r=> {
            
        }).catch(e=>{
            
        });
    } 

    //crear registro
    const create = async(data: ICategoryProduct) => {
        let resp = false;
        setLoading(true);
        await api.post(`/category-products`, data).then(r=> {
            notificationMessage('success','Éxito','mensaje de aplicación creado con éxito');
            resp = true;
        }).catch(e=>{
            notificationMessage('error','Error',e.error);
        });
        setLoading(false);
        return resp;
    }

    //actualizar registro
    const update = async(data: ICategoryProduct) => {
        let resp = false;
        setLoading(true);
        await api.put(`/category-products/${data.id}`,data).then(r=> {
            notificationMessage('success','Éxito','mensaje de aplicación actualizado con éxito');
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
        await api.delete<IPaginate>(`/category-products/${id}`).then(r=> {
            notificationMessage('success','Éxito','mensaje de aplicación eliminado con éxito');
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
        _getAll
    }
}
