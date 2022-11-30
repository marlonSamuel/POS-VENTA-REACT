import React, { useContext, useEffect } from 'react'
import {Avatar, Button, Col, Pagination, Row, Space, Table, Tooltip, Image } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { IPurcharse } from '../../interfaces/ISaleShop';
import Swal from 'sweetalert2';
import { usePurcharse } from '../../hooks/usePurcharse';
import { Typography } from 'antd';
import { UIContext } from '../../context/UIContext';
import { getCurrencyFormat } from '../../helpers/shared';
import Moment from 'react-moment';
import { PurchaseInfo } from './PurchaseInfo';

const { Title } = Typography;

const baseURL = process.env.REACT_APP_API_URL;

export const Index = () => {
    //columnas para mostrar en datatable
    const columns = [
        {
            title: 'Factura',
            dataIndex: 'invoice',
            render: (_: string, record:IPurcharse) => (
            <>
                    <Image width={80} height={70} src={baseURL+record.invoice} />
            </>
            )   
        },
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
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            render: (_: string, record:IPurcharse) => (
            <Space>
                <Tooltip title="eliminar">
                    <Button onClick={() => removeItem(record)} type='primary' shape="circle" icon={<DeleteOutlined />} danger/>
                </Tooltip>
            </Space>
            )   
        },
    ];

    const {items, onChangePag, data, remove, getAll} = usePurcharse();
    const {loading} = useContext(UIContext);

    useEffect(() => {
        getAll();
    }, []);

    //función para remover registro
    const removeItem = (record:IPurcharse) => {
        Swal.fire({
            title: '¿Esta seguro de eliminar comra?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(async(result) => {
            if(result.isConfirmed){
            const resp = await remove(record.id);
            if (resp)onChangePag(0,0); //listar los registros en caso exitosos
            }
        })
        }

    return (
        <div>
            <Row >
                <Col span={20}>
                    <Title level={3}><ShoppingCartOutlined /> COMPRAS</Title>
                </Col>
            </Row>
            
            <Table
                rowKey="id" 
                columns={columns}
                loading={loading}
                size='small'
                dataSource={items}
                pagination={false}
                scroll={{x:20}}
                expandable={{
                    expandedRowRender: record => 
                        <div style={{ margin: 25 }}>
                            <PurchaseInfo 
                                info={record} 
                            />
                        </div>,
                    }} />

                <Row justify='end' style={{paddingTop: 10}}>
                    <Pagination
                         responsive
                        onChange={onChangePag}
                        total={data.total}
                        showTotal={() => `${ data.total > data.per_page ? (data.to - data.per_page)+1 : 1}-${data.to} de ${data.total} registros`}
                        current={data.current_page}
                    />
                </Row>
        </div>
    )
}
