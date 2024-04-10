import { DeleteOutlined, EditOutlined, PlusCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Col, Pagination, Row, Space, Table, Tooltip } from 'antd';
import { Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UIContext } from '../../../context/UIContext';
import { CreateOrEdit } from './CreateOrEdit';
import { IClient } from '../../../interfaces/ISaleShop';
import moment from 'moment';
import { useClient } from '../../../hooks/useClient';

const { Title } = Typography;

const initialState : IClient = {
  id: 0,
  names: '',
  last_names: '',
  dir: '',
  birthday: new Date(),
  cellphone: '',
  cui: '',
  nit: '',
  email: ''
}

export const ClientPage = () => {
    //columnas para mostrar en datatable
    const columns = [
      { title: 'Nombres', dataIndex: 'names', key: 'names' },
      { title: 'Apellidos', dataIndex: 'last_names', key: 'last_names' },
      { title: 'Teléfono', dataIndex: 'cellphone', key: 'cellphone' },
      { title: 'CUI', dataIndex: 'cui', key: 'cui' },
      { title: 'NIT', dataIndex: 'nit', key: 'nit' },
      { title: 'Dirección', dataIndex: 'dir', key: 'dir' },
      {
        title: 'Acciones',
        dataIndex: 'acciones',
        render: (_: string, record:IClient) => (
          <Space>
            <Tooltip title="editar">
              <Button  onClick={() => edit(record)} type='primary' shape="circle" icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title="eliminar">
              <Button onClick={() => removeItem(record)} type='primary' shape="circle" icon={<DeleteOutlined />} danger/>
            </Tooltip>
          </Space>
        )   
      },
    ];
    
      //llamar hook para application
    const {loading} = useContext(UIContext);
    const {items, onChangePag, data, remove, getAll} = useClient();

    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState<IClient>(initialState);

    useEffect(() => {
      getAll();
    }, []);

    //salir de modal evaluar si es cancelar o registro exitoso
    const onFinish = (success:boolean) => {
      console.log("onfinsh");
      setVisible(false);
      setFormData(initialState);
      //si se realizó correctamente la operación, obtenemos de nuevo los registros
      if(success) onChangePag(0,0);
    }

    //función para mandar abrir el modal en modo edición
    const edit = (record: IClient) => {
      setFormData(record);
      setVisible(true);
    }

    //función para remover registro
    const removeItem = (record:IClient) => {
      Swal.fire({
        title: 'Esta seguro de eliminar registro '+record.names+' ?',
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
      /* mostrar modal de creación */
        <div>
          <CreateOrEdit 
            visible={visible}
            onFinish={onFinish}
            formData={formData}
          />
            <Row >
                <Col span={20}>
                    <Title level={3}><UsergroupAddOutlined /> CLIENTES</Title>
                </Col>
                <div style={{}}>
                <Button onClick={()=>{setVisible(true)}}  icon={<PlusCircleOutlined />} size='small' type="primary">
                       Nuevo 
                    </Button>
                </div>
            </Row>
            
            <Table
                rowKey="id" 
                columns={columns}
                loading={loading}
                size='small'
                dataSource={items}
                pagination={false}
                scroll={{x:20}}
                /* expandable={{
                    expandedRowRender: record => 
                        <p style={{ margin: 0 }}>{record.os}
                    </p>,
                  }} */ />

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
