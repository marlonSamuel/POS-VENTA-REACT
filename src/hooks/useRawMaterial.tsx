import { Popconfirm, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/axios';
import { UIContext } from '../context/UIContext';
import { initialState, notificationMessage } from '../helpers/shared';
import { IPaginate } from '../interfaces/IApp';
import { IRawMaterial } from '../interfaces/IInventory';


export const useRawMaterial = () => {
   //loading para el datatable
   const {setLoading} = useContext(UIContext);
     //obtener data de paginación
    const [data, setData] = useState<IPaginate>(initialState);
    //llenar lista
    const [items, setItems] = useState<IRawMaterial[]>([]);
    
    //lista inicial de data
    const getAll = async(page=0,search ='') => {
        setLoading(true);
        await api.get<IPaginate>('/raw-materials?page='+page+'&search='+search).then(r=> {
            setData(r.data);
            setItems(r.data.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

    //obtener app message por id
    const getById = async(id:number) => {
        await api.get<IPaginate>(`/raw-materials/${id}`).then(r=> {
            
        }).catch(e=>{
            
        });
    } 

    //crear registro
    const create = async(data: any) => {
        let resp = false;
        setLoading(true);
        await api.post(`/raw-materials`, data).then(r=> {
            notificationMessage('success','Éxito','materia prima creado con éxito');
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
        await api.post(`/raw-materials-update`,data).then(r=> {
            notificationMessage('success','Éxito','materia prima actualizado con éxito');
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
        await api.delete<IPaginate>(`/raw-materials/${id}`).then(r=> {
            notificationMessage('success','Éxito','materia prima eliminado con éxito');
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
        remove,
        getAll
    }
}
