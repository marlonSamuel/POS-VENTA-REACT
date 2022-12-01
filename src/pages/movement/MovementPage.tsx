import { DeleteOutlined, EditOutlined, PlusCircleOutlined, DollarCircleFilled } from '@ant-design/icons';
import { Button, Col, Pagination, Row, Space, Table, Tooltip } from 'antd';
import { Typography } from 'antd';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UIContext } from '../../context/UIContext';
import { useMovement } from '../../hooks/useMovement';
import { IMovement } from '../../interfaces/ISaleShop';
import { CreateOrEdit } from './CreateOrEdit';

const { Title } = Typography;

const initialState : IMovement = {
  id: 0,
  movement_type: '',
  description: '',
  price: 0,
  date: moment().format('YYYY-MM-DD')
}

export const MovementPage = () => {
    let { type } = useParams();
    const history = useNavigate();
    //columnas para mostrar en datatable
    const columns = [
      { title: 'Tipo de movimiento', dataIndex: 'movement_type', key: 'movement_type',
            render: (value: string)=> 
            <b>
              {value === 'i' ? 'Ingreso': 'Egreso'}
            </b> 
      },
      { title: 'Fecha', dataIndex: 'date', key: 'date',
            render: (value: string)=>  
            <Moment format="DD-MM-YYYY">
                {value}
            </Moment>},
      { title: 'Descripción', dataIndex: 'description', key: 'description' },
      {
        title: 'Acciones',
        dataIndex: 'acciones',
        render: (_: string, record:IMovement) => (
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
    const {items, onChangePag, data, remove, getAll} = useMovement();

    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState<IMovement>(initialState);
    const [title, setTitle] = useState('');

    useEffect(() => {
      getAll(0,type!);
      formData.movement_type = type!;
      setTitle(type === 'i' ? 'INGRESOS' : 'GASTOS')
      if(type !== 'i' && type !== 'o') history('/'); 
    }, [type]);

    //salir de modal evaluar si es cancelar o registro exitoso
    const onFinish = (success:boolean) => {
      console.log("onfinsh");
      setVisible(false);
      setFormData(initialState);
      //si se realizó correctamente la operación, obtenemos de nuevo los registros
      if(success) onChangePag(0,type!);
    }

    //función para mandar abrir el modal en modo edición
    const edit = (record: IMovement) => {
      record.date = moment(record.date).format('YYYY-MM-DD')
      setFormData(record);
      setVisible(true);
    }

    //función para remover registro
    const removeItem = (record:IMovement) => {
      Swal.fire({
        title: 'Esta seguro de eliminar movimiento',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then(async(result) => {
        if(result.isConfirmed){
          const resp = await remove(record.id);
          if (resp)onChangePag(0,type!); //listar los registros en caso exitosos
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
                    <Title level={3}><DollarCircleFilled /> {title}</Title>
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
                        onChange={(v)=>onChangePag(v,type!)}
                        total={data.total}
                        showTotal={() => `${ data.total > data.per_page ? (data.to - data.per_page)+1 : 1}-${data.to} de ${data.total} registros`}
                        current={data.current_page}
                    />
                </Row>
        </div>
    )
}
