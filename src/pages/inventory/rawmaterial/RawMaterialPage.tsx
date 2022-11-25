import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined, PlusOutlined, PlusSquareOutlined, QrcodeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Image, List, Pagination, Row, Space, Spin, Table, Tooltip } from 'antd';
import { Typography } from 'antd';
import { useContext, useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { UIContext } from '../../../context/UIContext';
import { useRawMaterial } from '../../../hooks/useRawMaterial';
import { IRawMaterial } from '../../../interfaces/IInventory';
import { CreateOrEdit } from './CreateOrEdit';
import { debounce } from "lodash"
import Search from 'antd/lib/input/Search';
import Meta from 'antd/lib/card/Meta';
import { getCurrencyFormat, loadingIcon } from '../../../helpers/shared';

const { Title } = Typography;
const baseURL = process.env.REACT_APP_API_URL;

const initialState : IRawMaterial = {
  id: 0,
  name: '',
  description: '',
  image: '',
  price: 0.00
}

interface IAddToProduct {
  addvisible?: boolean,
  addMaterial?: (item: IRawMaterial)=> void
}

export const RawMaterialPage = ( {addvisible, addMaterial } : IAddToProduct) => {
      //llamar hook para application
    const {loading} = useContext(UIContext);
    const {items, onChangePag, data, remove, getAll} = useRawMaterial();

    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState<IRawMaterial>(initialState);
    const [search,setSearch] = useState('');

    useEffect(() => {
      getAll();
    }, []);

    //salir de modal evaluar si es cancelar o registro exitoso
    const onFinish = (success:boolean) => {
      console.log("onfinsh");
      setVisible(false);
      setFormData(initialState);
      //si se realizó correctamente la operación, obtenemos de nuevo los registros
      if(success) onChangePag(0);
    }

    //función para mandar abrir el modal en modo edición
    const edit = (record: IRawMaterial) => {
      setFormData(record);
      setVisible(true);
    }

    //función para remover registro
    const removeItem = (record:IRawMaterial) => {
      Swal.fire({
        title: 'Esta seguro de eliminar registro '+record.name+' ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then(async(result) => {
        if(result.isConfirmed){
          const resp = await remove(record.id);
          if (resp)onChangePag(0); //listar los registros en caso exitosos
        }
      })
    }

    const searchUser = ({target}: any) => {
        let {value} = target;
        if(value == '') {value = undefined}
        onChangePag(0,value)
    }

    //deboucer para optimizar la busqueda de usuarios
    const debouncedChangeHandler = useMemo(
        () => debounce(searchUser, 300)
    , []);

    return (
      /* mostrar modal de creación */
        <div>
            
            <Spin spinning={loading} size="large" tip="cargando resultados..." indicator={loadingIcon()}>
          <CreateOrEdit 
            visible={visible}
            onFinish={onFinish}
            formData={formData}
          />
            <Row >
                <Col span={20}>
                    <Title level={3}><QrcodeOutlined /> MATERIA PRIMA</Title>
                </Col>
                <Col span={4}>
                <Button onClick={()=>{setVisible(true)}}  icon={<PlusCircleOutlined />} size='small' type="primary">
                       Nuevo 
                    </Button>
                </Col>
                <Col span={24}>
                    <Search placeholder="Buscar por nombre" onChange={debouncedChangeHandler} />
                </Col>
                <Divider />
                
            <List
                style={{overflowY: 'scroll', height: 'calc(100vh - 100px)', width: '100%'}}
                grid={{
                gutter: 16,
                column: 3,
                xs: 1
                }}
                dataSource={items}
                renderItem={item => (
                <List.Item>
                    <Card style={{width: 300}} hoverable
                            actions={
                              !addvisible?

                              [
                                <Tooltip title="agregar a compras">
                                    <ShoppingCartOutlined style={{color: '#007bff'}} key="perfil" />
                                  </Tooltip>,
                                  <Tooltip title="Editar">
                                      <EditOutlined style={{color: '#ffc107'}} onClick={() => edit(item)}/>
                                  </Tooltip>,
                                  <Tooltip title="Eliminar">
                                      <DeleteOutlined style={{color: 'red'}} key="delete" onClick={() => removeItem(item)}/>
                                  </Tooltip>,

                                  
                              ]
                              :[
                                <Tooltip title="Agregar a producto">
                                    <Button onClick={()=> addMaterial!(item)} type="primary" shape="circle" icon={<PlusSquareOutlined />} />
                                  </Tooltip>
                              ]

                            }
                          >
                            <Image
                                    width={250}
                                    height={200}
                                    src={baseURL!+item.image}
                                />
                            <Meta
                                    description={<>
                                    <Divider />
                                        <b style={{color: 'black'}}>{item.name}</b><br />
                                        {item.description}
                                    </>} 
                            />
                            <Meta
                                    description={
                                        <Space>
                                            <Divider />
                                            <b style={{color: item.stock! > 1 ?'green': 'red'}}>{item.stock} en existencia</b>
                                            <b style={{color: 'rgba(16, 142, 233, 1)'}}>{getCurrencyFormat(item.price)}</b>
                                        </Space>
                                    } 
                            />
                        </Card>
                </List.Item>
                )}
            />
                

            </Row>

                <Row justify='end' style={{paddingTop: 10}}>
                    <Pagination
                         responsive
                        onChange={(v)=>onChangePag(v,search)}
                        total={data.total}
                        showTotal={() => `${ data.total > data.per_page ? (data.to - data.per_page)+1 : 1}-${data.to} de ${data.total} registros`}
                        current={data.current_page}
                    />
                </Row>
            
                </Spin>
        </div>
    )
}
