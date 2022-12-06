import { Divider, Spin, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useContext, useEffect } from 'react'
import Moment from 'react-moment';
import { RContext } from '../../context/ReportContext';
import { UIContext } from '../../context/UIContext';
import { getCurrencyFormat, loadingIcon } from '../../helpers/shared';
import { useReport } from '../../hooks/useReport';
import { IPurcharse } from '../../interfaces/ISaleShop';

export const ReportPurchases = () => {

        //columnas para mostrar en datatable
        const columns = [
            { title: 'Fecha de compra', dataIndex: 'date', key: 'date',
                render: (value: string)=>  
                <Moment format="DD-MM-YYYY">
                    {value}
                </Moment>},
            {
                title: 'Total',
                dataIndex: 'total',
                render: (_: string, record:IPurcharse) => (
                <>
                    {getCurrencyFormat(record.total)}
                </>
                )   
            },
            { title: 'Descripcion', dataIndex: 'description', key: 'description' },
        ];

    const {filter} = useContext(RContext);
    const {loading} = useContext(UIContext);
    const {purchases, getPurchases} = useReport();

    useEffect(()=>{
        getPurchases();
    },[filter])

  return (
    <Spin spinning={loading} size="large" tip="espere por favor..." indicator={loadingIcon()}>
        <Title level={4}>REPORTE DE VENTAS</Title>
        <b>CANTIDAD DE VENTAS:  {purchases.quantity}</b><br />
        <b>TOTAL EN VENTAS: {getCurrencyFormat(purchases.total)}</b>

        <Divider />
        <Title level={5}>DETALLE</Title>

        <Table
                rowKey="id" 
                columns={columns}
                loading={loading}
                size='small'
                dataSource={purchases.data}
                scroll={{x:20}} />
    </Spin>
  )
}
