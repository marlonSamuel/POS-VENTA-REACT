import { DollarCircleFilled, LikeOutlined, QrcodeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Col, Divider, Row, Spin, Statistic } from 'antd'
import React, { useContext, useEffect } from 'react'
import { UIContext } from '../../context/UIContext'
import { getCurrencyFormat, loadingIcon } from '../../helpers/shared'
import { useDashboard } from '../../hooks/useDashboard'

export const CountPage = () => {
    const {loading} = useContext(UIContext);
    const {getAll, dashR} = useDashboard();

    useEffect(() => {
      getAll()
    }, [])
    
  return (
    <Spin spinning={loading} size="large" tip="espere por favor..." indicator={loadingIcon()}>
        <Row gutter={16}>
            <Col xs={{span: 24}} lg={{span: 8}}>
                <Statistic valueStyle={{color: 'green'}} 
                    title="PRODUCTOS TERMINADOS" 
                    value={dashR.products} prefix={<QrcodeOutlined />} />
            </Col>
            <Col xs={{span: 24}} lg={{span: 8}}>
                <Statistic valueStyle={{color: 'green'}} 
                title="VENTAS" formatter={()=>getCurrencyFormat(dashR.sales)} prefix={<ShoppingCartOutlined />} />
            </Col>
            <Col xs={{span: 24}} lg={{span: 8}}>
                <Statistic valueStyle={{color: 'green'}} 
                title="INGRESOS VARIOS" formatter={()=>getCurrencyFormat(dashR.incomes)} prefix={<DollarCircleFilled />} />
            </Col>
        </Row>
        <Divider />
        <Row>
            <Col xs={{span: 24}} lg={{span: 8}} >
                <Statistic valueStyle={{color: 'red'}} 
                title="COMPRAS" formatter={()=>getCurrencyFormat(dashR.purchases)} prefix={<ShoppingCartOutlined />} />
            </Col>
            <Col xs={{span: 24}} lg={{span: 8}} >
                <Statistic valueStyle={{color: 'red'}} 
                title="GASTOS VARIOS" formatter={()=>getCurrencyFormat(dashR.outcomes)} prefix={<DollarCircleFilled />} />
            </Col>
        </Row>
    </Spin>
  )
}
