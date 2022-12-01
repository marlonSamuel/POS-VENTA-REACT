import React from 'react'
import { IPurcharse, ISale, ISaleDetail, IShopDetail } from '../../interfaces/ISaleShop'
import {Divider, Image, Table} from 'antd';
import { getCurrencyFormat } from '../../helpers/shared';

interface IData {
    info: ISale
}

const baseURL = process.env.REACT_APP_API_URL;

export const SaleInfo = ({info}: IData) => {

    const columns = [
        {
            title: 'Producto',
            dataIndex: 'producto',
            render: (_: string, record:ISaleDetail) => (
            <>
                    <Image width={80} height={70} src={baseURL+record.product?.photo!} />
            </>
            )   
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            render: (_: string, record:ISaleDetail) => (
            <>
                {record.product?.name}
            </>
            )   
        },
        { title: 'Cantidad comprada', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Precio de producto',
            dataIndex: 'Sale_price',
            render: (_: string, record:ISaleDetail) => (
            <>
                {getCurrencyFormat(record.sale_price)}
            </>
            )   
        },
        {
            title: 'Descuento',
            dataIndex: 'discount',
            render: (_: string, record:ISaleDetail) => (
            <>
                {getCurrencyFormat(record.discount)}
            </>
            )   
        },
        {
            title: 'Precio de venta',
            dataIndex: 'Sale_price_p',
            render: (_: string, record:ISaleDetail) => (
            <>
                {getCurrencyFormat((record.sale_price * record.quantity) - record.discount)}
            </>
            )   
        },
    ];

  return (
    <div>
        <b>Detalle de venta</b> <Divider />
        {
            info.discounted &&
            <> 
                <b>Razon de descuento: </b> <span>{info.discount_reason}</span>
            </>
           
        }

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
