import { Popconfirm, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/axios';
import { UIContext } from '../context/UIContext';
import { initialState, notificationMessage } from '../helpers/shared';
import { IPaginate } from '../interfaces/IApp';
import { IProvider } from '../interfaces/IConf';
import { IMovement } from '../interfaces/ISaleShop';


export const useMovement = () => {
   //loading para el datatable
   const {setLoading} = useContext(UIContext);
     //obtener data de paginación
    const [data, setData] = useState<IPaginate>(initialState);
    //llenar lista
    const [items, setItems] = useState<IMovement[]>([]);
    
    //lista inicial de data
    const getAll = async(page=0, search: string) => {
        setLoading(true);
        await api.get<IPaginate>('/movements?page='+page+'&search='+search).then(r=> {
            setData(r.data);
            setItems(r.data.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

    //lista inicial de data sin paginación
    const _getAll = async(page=0) => {
        setLoading(true);
        await api.get('/movements-all').then(r=> {
            setItems(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    }

    //obtener app message por id
    const getById = async(id:number) => {
        await api.get<IPaginate>(`/movements/${id}`).then(r=> {
            
        }).catch(e=>{
            
        });
    } 

    //crear registro
    const create = async(data: IMovement) => {
        let resp = false;
        setLoading(true);
        await api.post(`/movements`, data).then(r=> {
            notificationMessage('success','Éxito','Movimiento creado con éxito');
            resp = true;
        }).catch(e=>{
            notificationMessage('error','Error',e.error);
        });
        setLoading(false);
        return resp;
    }

    //actualizar registro
    const update = async(data: IMovement) => {
        let resp = false;
        setLoading(true);
        await api.put(`/movements/${data.id}`,data).then(r=> {
            notificationMessage('success','Éxito','Movimiento actualizado con éxito');
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
        await api.delete<IPaginate>(`/movements/${id}`).then(r=> {
            notificationMessage('success','Éxito','Movimiento eliminado con éxito');
            resp = true;
        }).catch(e=>{
            notificationMessage('error','Error',e.error);
        });
        setLoading(false);
        return resp;
    }

    //capturar cambio de paginación
    const onChangePag = (current: number, search:string) => {
        getAll(current,search);
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
