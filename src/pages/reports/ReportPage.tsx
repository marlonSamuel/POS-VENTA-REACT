import { DashOutlined, DollarOutlined, FileDoneOutlined, SearchOutlined, ShoppingCartOutlined, ShoppingTwoTone, ZoomInOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/AntdIcon';
import { Button, Col, Form, Input, Row, Tabs } from 'antd';
import React, { useContext } from 'react'
import { RContext, RProvider } from '../../context/ReportContext';
import { ReportBalance } from './ReportBalance';
import { ReportMovements } from './ReportMovements';
import { ReportPurchases } from './ReportPurchases';
import { ReportSales } from './ReportSales';

const items = [
    {
        label: (
            <span>
              <ShoppingTwoTone /> Ventas
            </span>
          ),
          key: 'sales',
          children: <ReportSales />
    },
    {
        label: (
            <span>
              <ShoppingCartOutlined /> Compras
            </span>
          ),
          key: 'purchases',
          children: <ReportPurchases />
    },
    {
        label: (
            <span>
              <DollarOutlined /> Movimientos
            </span>
          ),
          key: 'mov',
          children: <ReportMovements />
    },
    {
        label: (
            <span>
              <FileDoneOutlined /> Balance general
            </span>
          ),
          key: 'balance',
          children: <ReportBalance />
    }
];

export const ReportPage = () => {
    const [form] = Form.useForm();
    const {setFilter} = useContext(RContext);

    //pre validación antes de en enviar.
    const validate = () => {
        form.validateFields().then((values) => {
            setFilter(values);
        }).catch(e=>{

        });
    }

  return (
    <div>
        <Form
          form={form}
          key="form"
          layout="vertical"
          name="form_in_modal"
          size='small'
        >
          <Row gutter={16}>
            <Col xs={{span: 24}} lg={{span: 8}}>
                <Form.Item
                        name="from"
                        key="from"
                        label="Fecha inicio"
                        rules={[
                        {
                            required: true,
                            message: 'Fecha inicio es requerida!',
                        },
                        ]}
                    >
                        <Input type='date'/>
                    </Form.Item>
            </Col>
            <Col xs={{span: 24}} lg={{span: 8}}>
                <Form.Item
                        name="to"
                        key="to"
                        label="Fecha fin"
                        rules={[
                        {
                            required: true,
                            message: 'Fecha fin es requerida!',
                        },
                        ]}
                    >
                        <Input type='date'/>
                    </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={{span: 24}} lg={{span: 8}}>
                <Button onClick={validate} type='primary' icon={<SearchOutlined />}>Buscar</Button>
            </Col>
          </Row>
        </Form>
        <Tabs
            defaultActiveKey="sales"
            centered
            items={items} 
    />
    </div>
  )
}


export const ContextReportPage = () => {
    return (<RProvider>
        <ReportPage />
    </RProvider>)
}
