import { Col, Divider, Row, Spin, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useContext, useEffect } from 'react'
import Moment from 'react-moment';
import { RContext } from '../../context/ReportContext';
import { UIContext } from '../../context/UIContext';
import { getCurrencyFormat, loadingIcon } from '../../helpers/shared';
import { useReport } from '../../hooks/useReport';
import { IMovement } from '../../interfaces/ISaleShop';

export const ReportMovements = () => {

    const columns = [
        {
            title: 'Total',
            dataIndex: 'total',
            render: (_: string, record:IMovement) => (
            <>
                {getCurrencyFormat(record.price)}
            </>
            )   
        },
        { title: 'Tipo de movimiento', dataIndex: 'movement_type', key: 'movement_type',
              render: (value: string)=> 
              <b style={{color: value === 'i' ? 'green':'red'}}>
                {value === 'i' ? 'Ingreso': 'Egreso'}
              </b> 
        },
        { title: 'Fecha', dataIndex: 'date', key: 'date',
              render: (value: string)=>  
              <Moment format="DD-MM-YYYY">
                  {value}
              </Moment>},
        { title: 'Descripción', dataIndex: 'description', key: 'description' }
      ];

    const {filter} = useContext(RContext);
    const {loading} = useContext(UIContext);
    const {movements, getMovements} = useReport();

    useEffect(()=>{
        getMovements();
    },[filter])

  return (
    <Spin spinning={loading} size="large" tip="espere por favor..." indicator={loadingIcon()}>
        <Title level={4}>REPORTE DE VENTAS</Title>
        <Row>
            <Col xs={{span: 24}} lg={{span: 12}}>
                <b>CANTIDAD DE INGRESOS:  {movements.quantity_i}</b><br />
                <b>TOTAL EN INGRESOS: {getCurrencyFormat(movements.total_i)}</b>
            </Col>
            <Col xs={{span: 24}} lg={{span: 12}}>
                <b>CANTIDAD DE GASTOS:  {movements.quantity_o}</b><br />
                <b>TOTAL EN GASTOS: {getCurrencyFormat(movements.total_o)}</b>
            </Col>
        </Row>

        <Divider />
        <Title level={5}>DETALLE</Title>

        <Table
                rowKey="id" 
                columns={columns}
                loading={loading}
                size='small'
                dataSource={movements.data}
                scroll={{x:20}} />
    </Spin>
  )
}
