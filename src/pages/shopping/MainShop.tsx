import React, { useContext, useEffect, useState } from 'react'
import {ClearOutlined, ShoppingCartOutlined, PlusCircleOutlined, QrcodeOutlined, SaveOutlined, UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { 
    Button, Card, Col, Divider, 
    Form, Image, InputNumber, 
    List, Modal, Row, Upload, FloatButton, 
    Tooltip, Select, Spin } from 'antd';
import { getCurrencyFormat, loadingIcon, notificationMessage } from '../../helpers/shared';
import { SPContext } from '../../context/shop/ShopContext';
import { IPurcharse, IShopDetail } from '../../interfaces/ISaleShop';
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

const baseURL = process.env.REACT_APP_API_URL;
const { Option } = Select;

export const MainShop = () => {
    const [form] = Form.useForm();

    const history = useNavigate();
    const {loading, setRoutesBC} = useContext(UIContext);
    const [total, setTotal] = useState(0);
    const {items, setItems, removeRawMaterial, setIsShop} = useContext(SPContext);
    const {_getAll, items : providers} = useProvider();
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState();
    const {create} = usePurcharse();

    useEffect(()=>{
        setRoutesBC([
            {path: '/raw-materials', key: 'raw-material',name: 'Materia prima',last: false, icon: <QrcodeOutlined />},
            {path: '/create-or-edit',key: 'pay-credits',name: 'Compra',last: true,icon: <ShoppingCartOutlined />},
        ])
        _getAll();
    },[]);

    useEffect(()=>{
        _setTotal();
    },[items]);

    
    const onCreate = async(values: IPurcharse) => {
        console.log(values)
        console.log(items)
        if(!imageFile || imageFile === ''){
            notificationMessage('error','Error','La factura es obligatoria');
            return;
        }

        if(items.length == 0){
            notificationMessage('error','Error','el detalle del material comprado es obligatorio');
            return;
        }
        const _values = new FormData();
        _values.append('invoice', imageFile!);
        _values.append('description', values.description);
        _values.append('date', values.date.toString());
        _values.append('total', values.total.toString());
        _values.append('provider_id',values.provider_id.toString());
        _values.append('detail',JSON.stringify(items));

        const resp = await create(_values);
        if(resp) {
            history('/purchases');
            _clearPurchase();
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

    const onChange = (value: number, item: IShopDetail) => {
        const newDetail = items.map(obj => {
            if (obj.raw_material_id === item.raw_material_id) {
              return {...obj, quantity: value};
            }
            return obj;
          });
        setItems(newDetail);
    }

    const onChangeDis = (value: number, item: IShopDetail) => {
        const newDetail = items.map(obj => {
            if (obj.raw_material_id === item.raw_material_id) {
              return {...obj, discount: value};
            }
            return obj;
          });
        setItems(newDetail);
    }

    const _setTotal = () => {
        const result = items.reduce((accumulator, current) => {
            return accumulator + (current.quantity * parseFloat((current.purchase_price).toString()))-current.discount;
          }, 0);
          setTotal(result);
    }

    //obtener en base 64
    const getBase64 = (file:any, cb:any) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    //antes de subir imagen validar
    const beforeUpload = (file: any) => {
        console.log(file.type)
        if(!['image/jpg','image/png','image/jpeg','image/webp'].includes(file.type)) {
            notificationMessage('Advertencia','warning','Tipo de archivo no admintido')
            return Upload.LIST_IGNORE
        };
        setImageFile(file);
        getBase64(file, (result:any) => {
            setImage(result);
        });
        return false;
    }

    const onRemove = ()=>{
        setImage('');
    }

    const _clearPurchase = () =>{
        setIsShop(false);
        setItems([]);
        history('/raw-materials');
    }

    return (
        <div>
            <BreadCrubPage />
            <Title level={3}>NUEVA ORDEN DE COMPRA</Title>
            <Spin spinning={loading} size="large" tip="espere por favor..." indicator={loadingIcon()}>
            <Row gutter={16}>
                <Col className="gutter-row" xs={{span: 24}} lg={{span: 16}}>
                    <Form
                        form={form}
                        key="form"
                        layout="vertical"
                        name="form_in_modal"
                        size="small"
                    >

                    <Row gutter={16}>
                    <Col xs={{span: 24}} lg={{span: 12}}>
                        <Form.Item
                                name="date"
                                key="date"
                                label="Fecha de compra"
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

                        <Col className="gutter-row" xs={{span: 24}} lg={{span: 12}}>
                            <Form.Item
                                name="provider_id"
                                key="provider_id"
                                label="Proveedor"
                                rules={[
                                {
                                    required: true,
                                    message: 'el campo proveedor es requerido!',
                                },
                                ]}
                            >
                            <Select
                                key='s1'
                                placeholder="Seleccione proveedor"
                                loading={loading}
                                showSearch
                                filterOption={(input: any, option: any) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                allowClear
                                >
                                {
                                    providers.map((c: IProvider) => (
                                        <Option key={c.id} value={c.id}>{c.name}</Option>
                                    ))
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>    
                    <Row gutter={16}>
                        <Col xs={{span: 24}} lg={{span: 24}}>
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
                </Form>
                </Col>
                
                <Col className="gutter-row" xs={{span: 24}} lg={{span: 8}}>
                    <Image
                            width={300}
                            height={200}
                            src={image}
                        />
                    
                    <Upload maxCount={1} onRemove={()=> onRemove()} beforeUpload={(file)=> beforeUpload(file)}>
                        <Button size='small' icon={<UploadOutlined />}>Seleccionar factura</Button>
                    </Upload>
                </Col>
            </Row>
            
            <Divider /> 
            <Row gutter={16}>
                    <Col span={24}>        
                        <Card title={<>
                            <PlusCircleOutlined onClick={()=>history('/raw-materials')} /> Agregar mas productos de materia prima
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
                                        <InputNumber size="small" style={{width:'60px'}} min={1} value={item.quantity} onChange={(v)=>onChange(v!,item)} />,
                                        <InputNumber size="small" placeholder='descuento' style={{width:'75px'}} min={0} max={item.purchase_price} value={item.discount} onChange={(v)=>onChangeDis(v!,item)} />,
                                        <Tooltip title="Remover material">
                                            <Button onClick={()=>removeRawMaterial(item)} danger type='primary' icon={<MinusCircleOutlined />} />
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
                                                <b style={{color: 'black'}}>{item.material_name}</b><br />
                                                <b style={{color: 'rgba(16, 142, 233, 1)'}}>Costo por unidad: {getCurrencyFormat(item.purchase_price)}</b><br />
                                            </>} 
                                    />
                                </Card>
                            </List.Item>
                            )}
                        />
                        </Card>

                        <Tooltip title="Guardar compra">
                            <FloatButton type='primary' onClick={validate} icon={<SaveOutlined />} />
                        </Tooltip>
                        <Tooltip title="Vaciar order de compra">
                            <FloatButton style={{ right: 94, color: 'red' }} onClick={_clearPurchase} icon={<ClearOutlined />} />
                        </Tooltip>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}
