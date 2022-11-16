import { Popconfirm, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/axios';
import { UIContext } from '../context/UIContext';
import { initialState, notificationMessage } from '../helpers/shared';
import { IPaginate } from '../interfaces/IApp';
import { IProvider } from '../interfaces/IConf';


export const useProvider = () => {
   //loading para el datatable
   const {setLoading} = useContext(UIContext);
     //obtener data de paginación
    const [data, setData] = useState<IPaginate>(initialState);
    //llenar lista
    const [items, setItems] = useState<IProvider[]>([]);
    
    //lista inicial de data
    const getAll = async(page=0) => {
        setLoading(true);
        await api.get<IPaginate>('/providers?page='+page).then(r=> {
            setData(r.data);
            setItems(r.data.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

    //obtener app message por id
    const getById = async(id:number) => {
        await api.get<IPaginate>(`/providers/${id}`).then(r=> {
            
        }).catch(e=>{
            
        });
    } 

    //crear registro
    const create = async(data: IProvider) => {
        let resp = false;
        setLoading(true);
        await api.post(`/providers`, data).then(r=> {
            notificationMessage('success','Éxito','mensaje de aplicación creado con éxito');
            resp = true;
        }).catch(e=>{
            notificationMessage('error','Error',e.error);
        });
        setLoading(false);
        return resp;
    }

    //actualizar registro
    const update = async(data: IProvider) => {
        let resp = false;
        setLoading(true);
        await api.put(`/providers/${data.id}`,data).then(r=> {
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
        await api.delete<IPaginate>(`/providers/${id}`).then(r=> {
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
        getAll
    }
}
