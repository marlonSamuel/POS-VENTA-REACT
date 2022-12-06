import { Card, Divider, Spin, Table } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useContext, useEffect } from 'react'
import Moment from 'react-moment'
import { RContext } from '../../context/ReportContext'
import { UIContext } from '../../context/UIContext'
import { getCurrencyFormat, loadingIcon } from '../../helpers/shared'
import { useReport } from '../../hooks/useReport'
import { ISale } from '../../interfaces/ISaleShop'

export const ReportSales = () => {

    const columns = [
        { title: 'Fecha de venta', dataIndex: 'date', key: 'date',
            render: (value: string)=>  
            <Moment format="DD-MM-YYYY">
                {value}
            </Moment>},
        {
            title: 'Total',
            dataIndex: 'total',
            render: (_: string, record:ISale) => (
            <>
                {getCurrencyFormat(record.total)}
            </>
            )   
        },
        { title: 'Descripcion', dataIndex: 'description', key: 'description' }
    ];

    const {filter} = useContext(RContext);
    const {loading} = useContext(UIContext);
    const {sales, getSales} = useReport();
    
    useEffect(()=>{
        getSales();
    },[filter])

  return (
    <Spin spinning={loading} size="large" tip="espere por favor..." indicator={loadingIcon()}>
        <Title level={4}>REPORTE DE VENTAS</Title>
        <b>CANTIDAD DE VENTAS:  {sales.quantity}</b><br />
        <b>TOTAL EN VENTAS: {getCurrencyFormat(sales.total)}</b>

        <Divider />
        <Title level={5}>DETALLE</Title>

        <Table
                rowKey="id" 
                columns={columns}
                loading={loading}
                size='small'
                dataSource={sales.data}
                scroll={{x:20}} />
    </Spin>
  )
}
