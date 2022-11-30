import React from 'react'
import { IPurcharse, IShopDetail } from '../../interfaces/ISaleShop'
import {Divider, Image, Table} from 'antd';
import { getCurrencyFormat } from '../../helpers/shared';

interface IData {
    info: IPurcharse
}

const baseURL = process.env.REACT_APP_API_URL;

export const PurchaseInfo = ({info}: IData) => {

    const columns = [
        {
            title: 'Materia prima',
            dataIndex: 'raw_material',
            render: (_: string, record:IShopDetail) => (
            <>
                    <Image width={80} height={70} src={baseURL+record.raw_material?.image!} />
            </>
            )   
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            render: (_: string, record:IShopDetail) => (
            <>
                {record.raw_material?.name}
            </>
            )   
        },
        { title: 'Cantidad comprada', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Precio de producto',
            dataIndex: 'purchase_price',
            render: (_: string, record:IShopDetail) => (
            <>
                {getCurrencyFormat(record.purchase_price)}
            </>
            )   
        },
        {
            title: 'Descuento',
            dataIndex: 'discount',
            render: (_: string, record:IShopDetail) => (
            <>
                {getCurrencyFormat(record.discount)}
            </>
            )   
        },
        {
            title: 'Precio de compra',
            dataIndex: 'purchase_price_p',
            render: (_: string, record:IShopDetail) => (
            <>
                {getCurrencyFormat(record.purchase_price - record.discount)}
            </>
            )   
        },
    ];

  return (
    <div>
        <b>Detalle de compra</b> <Divider />
        <b>Proveedor: {info.provider.name}</b>

        <Table
            rowKey="id" 
            columns={columns}
            size='small'
            dataSource={info.detail}
            pagination={false}
            scroll={{x:20}} 
        />
    </div>
  )
}
