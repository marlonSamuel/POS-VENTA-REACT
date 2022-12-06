import { Col, Divider, Row, Space, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useContext, useEffect } from 'react'
import { RContext } from '../../context/ReportContext';
import { UIContext } from '../../context/UIContext';
import { getCurrencyFormat, loadingIcon } from '../../helpers/shared';
import { useReport } from '../../hooks/useReport';

export const ReportBalance = () => {
    const {filter} = useContext(RContext);
    const {loading} = useContext(UIContext);
    const {balance, getBalance} = useReport();

    useEffect(()=>{
        getBalance();
    },[filter])

    const getSaldo = () => {
        let inp = parseFloat(balance.sales.total.toString()) + parseFloat(balance.movements[0].total.toString())
        let out = parseFloat(balance.purchases.total.toString()) + parseFloat(balance.movements[1].total.toString())

        return inp - out;
    }

  return (
    <Spin spinning={loading} size="large" tip="espere por favor..." indicator={loadingIcon()}>
        
        <Row>
                <Col xs={{span: 24}} lg={{span: 24}}>
                    <Title level={3}>BALANCE</Title>
                    <b style={{color: getSaldo()<=0 ? 'red' : 'green'}}>SALDO: {getCurrencyFormat(getSaldo())}</b>
                </Col>
            </Row>
        <Divider />
            <Row style={{color: 'green'}}>
                <Col xs={{span: 24}} lg={{span: 12}}>
                    <Title level={5}>INGRESOS TOTALES</Title>
                    <b>VENTAS: {getCurrencyFormat(balance.sales.total)}</b><br />
                    <b>INGRESOS VARIOS: {getCurrencyFormat(balance.movements[0].total)}</b>
                    <Divider />
                    <b>TOTAL: {getCurrencyFormat(parseFloat(balance.sales.total.toString()) 
                            + parseFloat(balance.movements[0].total.toString()))}</b>
                    
                </Col>
                <Col style={{color: 'red'}} xs={{span: 24}} lg={{span: 12}}>
                    <Title level={5}>EGRESOS TOTALES</Title>
                    <b>COMPRAS:  {getCurrencyFormat(balance.purchases.total)}</b><br />
                    <b>GASTOS VARIOS: {getCurrencyFormat(balance.movements[1].total)}</b>
                    <Divider />
                    <b>TOTAL: {getCurrencyFormat(parseFloat(balance.purchases.total.toString()) 
                            + parseFloat(balance.movements[1].total.toString()))}</b>
                </Col>
            </Row>
    </Spin>
  )
}
