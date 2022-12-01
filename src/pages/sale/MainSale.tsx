import React, { useContext, useEffect, useState } from 'react'
import {ClearOutlined, ShoppingCartOutlined, PlusCircleOutlined, QrcodeOutlined, SaveOutlined, UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { 
    Button, Card, Col, Divider, 
    Form, Image, InputNumber, 
    List, Modal, Row, Upload, FloatButton, 
    Tooltip, Select, Spin } from 'antd';
import { getCurrencyFormat, loadingIcon, notificationMessage } from '../../helpers/shared';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import { useProvider } from '../../hooks/useProvider';
import { IProvider } from '../../interfaces/IConf';
import { UIContext } from '../../context/UIContext';
import { BreadCrubPage } from '../../components/shared/BreadCrubPage';
import { usePurcharse } from '../../hooks/usePurcharse';
import { SAContext } from '../../context/sale/SaleContext';
import { ISale, ISaleDetail } from '../../interfaces/ISaleShop';
import { useSale } from '../../hooks/useSale';

const baseURL = process.env.REACT_APP_API_URL;
const { Option } = Select;

export const MainSale = () => {
    const [form] = Form.useForm();

    const history = useNavigate();
    const {loading, setRoutesBC} = useContext(UIContext);
    const [total, setTotal] = useState(0);
    const {items, setItems, removeProduct, setIsSale} = useContext(SAContext);
    const {create} = useSale();
    const [isDiscount, setIsDiscount] = useState(false);

    useEffect(()=>{
        setRoutesBC([
            {path: '/products', key: 'products',name: 'Productos',last: false, icon: <QrcodeOutlined />},
            {path: '/create-or-edit',key: 'pay-credits',name: 'Compra',last: true,icon: <ShoppingCartOutlined />},
        ])
    },[]);

    useEffect(()=>{
        _setTotal();
        setIsDiscount(items.some(x=>x.discount > 0));
    },[items]);

    
    const onCreate = async(values: ISale) => {
        if(items.length == 0){
            notificationMessage('error','Error','el detalle del material comprado es obligatorio');
            return;
        }
        values.detail = items;
        values.discounted = isDiscount;
        const resp = await create(values);
        if(resp) {
            history('/sales');
            _clearSale();
        };
    }

      //pre validación antes de en enviar.
    const validate = () => {
        form.validateFields().then((values) => {
            //form.resetFields();
            values.total = total;
            onCreate(values);
        }).catch(e=>{

        });
    }

    const onChange = (value: number, item: ISaleDetail) => {
        const newDetail = items.map(obj => {
            if (obj.product_id === item.product_id) {
              return {...obj, quantity: parseInt(value.toString())};
            }
            return obj;
          });
        setItems(newDetail);
    }

    const onChangeDis = (value: number, item: ISaleDetail) => {
        const newDetail = items.map(obj => {
            if (obj.product_id === item.product_id) {
              return {...obj, discount: value};
            }
            return obj;
          });
        setItems(newDetail);
    }

    const _setTotal = () => {
        const result = items.reduce((accumulator, current) => {
            return accumulator + (current.quantity * parseFloat((current.sale_price).toString())) - current.discount;
          }, 0);
          setTotal(result);
    }

    const _clearSale = () =>{
        setIsSale(false);
        setItems([]);
        //history('/products');
    }

    return (
        <div>
            <BreadCrubPage />
            <Title level={3}>NUEVA ORDEN DE VENTA</Title>
            <Spin spinning={loading} size="large" tip="espere por favor..." indicator={loadingIcon()}>
            <Row gutter={16}>
                <Col className="gutter-row" xs={{span: 24}} lg={{span: 24}}>
                    <Form
                        form={form}
                        key="form"
                        layout="vertical"
                        name="form_in_modal"
                        size="small"
                    >

                    <Row gutter={16}>
                        <Col xs={{span: 24}} lg={{span: 8}}>
                            <Form.Item
                                    name="date"
                                    key="date"
                                    label="Fecha de venta"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'el campo fecha es requerido!',
                                    }
                                    ]}
                                >
                                    <Input name='date' type='date' />
                                </Form.Item>
                        </Col>

                        
                        <Col xs={{span: 24}} lg={{span: 16}}>
                            <Form.Item
                                name="description"
                                key="description"
                                label="Descripción"
                                rules={[
                                {
                                    required: true,
                                    message: 'El campo descripción es requerido!',
                                },
                                ]}
                            >
                                <TextArea rows={2} />
                            </Form.Item>
                        </Col>
                    </Row>    
                    {
                        isDiscount &&
                        <Row gutter={16}>
                            <Col xs={{span: 24}} lg={{span: 24}}>
                                <Form.Item
                                    name="discount_reason"
                                    key="discount_reason"
                                    label="Razón de descuento"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'El campo razon de descuento es requerido!',
                                    },
                                    ]}
                                >
                                    <TextArea rows={2} />
                                </Form.Item>
                            </Col>
                        </Row>
                    }
                </Form>
                </Col>
            </Row>
            
            <Divider /> 
            <Row gutter={16}>
                    <Col span={24}>        
                        <Card title={<>
                            <PlusCircleOutlined onClick={()=>history('/products')} /> Agregar mas productos de materia prima
                            <Divider />
                            Total de compra: <b style={{color: 'green'}}>{getCurrencyFormat(total)}</b>
                        </>}>

                            
                        <List style={{overflowY: 'scroll', height: 'calc(100vh - 100px)', width: '100%'}}
                            grid={{ gutter: 16, xs: 1, md: 4,lg: 4 }}
                            dataSource={items}
                            renderItem={item => (
                            <List.Item>
                                <Card 
                                    actions={[
                                        <InputNumber size="small" style={{width:'60px'}} min={1} max={item.stock} value={item.quantity} onChange={(v)=>onChange(v!,item)} />,
                                        <InputNumber size="small" placeholder='descuento' max={item.sale_price} style={{width:'75px'}} min={0} value={item.discount} onChange={(v)=>onChangeDis(v!,item)} />,
                                        <Tooltip title="Remover material">
                                            <Button onClick={()=>removeProduct(item)} danger type='primary' icon={<MinusCircleOutlined />} />
                                        </Tooltip>
                                    ]}
                                >
                                    <Image
                                        width={100}
                                        height={100}
                                            src={baseURL!+item.image}
                                        />
                                        <Meta
                                            description={<>
                                            <Divider />
                                                <b style={{color: 'black'}}>{item.product_name}</b><br />
                                                <b style={{color: item.stock! > 1 ?'green': 'red'}}>{item.stock} disponibles</b><br />
                                                <b style={{color: 'rgba(16, 142, 233, 1)'}}>Costo por unidad: {getCurrencyFormat(item.sale_price)}</b><br />
                                            </>} 
                                    />
                                </Card>
                            </List.Item>
                            )}
                        />
                        </Card>

                        <Tooltip title="Guardar venta">
                            <FloatButton type='primary' onClick={validate} icon={<SaveOutlined />} />
                        </Tooltip>
                        <Tooltip title="Vaciar carrito de ventas">
                            <FloatButton style={{ right: 94, color: 'red' }} onClick={_clearSale} icon={<ClearOutlined />} />
                        </Tooltip>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}
