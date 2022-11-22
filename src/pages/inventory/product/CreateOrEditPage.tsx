import { PlusCircleOutlined, QrcodeOutlined, SaveOutlined, UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { 
    Button, Card, Col, Divider, 
    Form, Image, InputNumber, 
    List, Modal, Row, Upload, FloatButton, 
    Tooltip, Select, Spin } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Input from 'antd/lib/input/Input';
import TextArea from 'antd/lib/input/TextArea';
import Title from 'antd/lib/typography/Title';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BreadCrubPage } from '../../../components/shared/BreadCrubPage';
import { UIContext } from '../../../context/UIContext';
import { getCurrencyFormat, loadingIcon, notificationMessage } from '../../../helpers/shared';
import { useCategoryProduct } from '../../../hooks/useCategoryProduct';
import { useProduct } from '../../../hooks/useProduct';
import { ICategoryProduct } from '../../../interfaces/IConf';
import { IProduct, IProductDetail, IRawMaterial } from '../../../interfaces/IInventory';
import { RawMaterialPage } from '../rawmaterial/RawMaterialPage';
const { Option } = Select;


const baseURL = process.env.REACT_APP_API_URL;

export const CreateOrEditPage = () => {
    let { id } = useParams();
    const [form] = Form.useForm();

    const history = useNavigate();
    const {_getAll, items : categories} = useCategoryProduct();
    const {setRoutesBC, loading} = useContext(UIContext);
    const [title, setTitle] = useState('NUEVO PRODUCTO');
    const [detail, setDetail] = useState<IProductDetail[]>([]);
    const [cost_price,setCostPrice] = useState(0.00);
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState();
    const [tempImage, setTemImage] = useState('');
    const {create, update, getById, item} = useProduct();

    useEffect(() => {
        setRoutesBC([
            {path: '/products', key: 'product',name: 'Productos',last: false, icon: <QrcodeOutlined />},
            {path: '/create-or-edit',key: 'pay-credits',name: !id ? 'Nuevo producto' : 'Editar producto',last: true,icon: <SaveOutlined />},
        ])
        !id ? setTitle('NUEVO PRODUCTO') : setTitle('EDITAR PRODUCTO')
        _getAll();
        form.setFieldsValue(item);
    }, []);

    useEffect(()=>{
        setTotalCost();
    },[detail]);

    useEffect(()=>{
        if(categories.length > 0 && id){
            _getById();
        }
    },[categories]);

    useEffect(()=>{
        if(item){
            form.setFieldsValue(item);
            setDetail(item!.detail!)
            if(item.photo !== '') setTemImage(item.photo!)
            //setCostPrice(item.cost_price)
        }
    },[item]);

    const _getById = async() => {
        await getById(parseInt(id!));
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };

    const onCancel = () => {
        setIsModalOpen(false);
    }

    const onOk = () => {
        setIsModalOpen(false);
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
        setTemImage('')
        return false;
    }

    const onRemove = ()=>{
        if(item?.photo !== '')setTemImage(item?.photo!)
    }

    const setTotalCost = () => {
        const result = detail.reduce((accumulator, current) => {
            return accumulator + parseFloat(current.cost_price.toString());
          }, 0);
          console.log(result)
          setCostPrice(result);
    }

    const addMaterial = (item: IRawMaterial) =>{
        const exists = detail?.some(x=>x.raw_material_id == item.id);
        if(!exists){
            setDetail([...detail, {
                raw_material_id: item.id,
                material_name: item.name,
                quantity: 0.1,
                cost_price: (item.price * 0.1),
                image: item.image!,
                stock: item.stock!,
                price: item.price
            }]);
        }
    }

    const removeMaterial = (item : IProductDetail)=>{
        setDetail(detail.filter(x=>x.raw_material_id !== item.raw_material_id));
    }

    const onChange = (value: number, item: IProductDetail) => {
        const newDetail = detail.map(obj => {
            if (obj.raw_material_id === item.raw_material_id) {
              return {...obj, quantity: value, cost_price: item.price * value};
            }
            return obj;
          });
        setDetail(newDetail);
    }

    const onCreate = async(values: IProduct) => {
        console.log(imageFile)
        if((!imageFile || imageFile === '') && item?.photo === ''){
            notificationMessage('error','Error','la foto es obligatoria');
            return;
        }

        if(detail.length == 0){
            notificationMessage('error','Error','el detalle del material utilizado es obligatorio');
            return;
        }
        const _values = new FormData();
        _values.append('photo', imageFile!);
        _values.append('name', values.name);
        _values.append('description', values.description);
        _values.append('price', values.price.toString());
        _values.append('cost_price', cost_price.toString());
        _values.append('stock', values.stock.toString());
        _values.append('category_product_id',values.category_product_id.toString());
        _values.append('detail',JSON.stringify(detail));

        if(item!.id == 0){
            const resp = await create(_values);
            if(resp) history('/products');
        }else{
            _values.append('id', item!.id.toString());
                const resp = await update(_values);
                if(resp) history('/products');
            }
    }

  //pre validación antes de en enviar.
  const validate = () => {
    form.validateFields().then((values) => {
        //form.resetFields();
        onCreate(values);
    }).catch(e=>{

    });
  }

  return (
    <div>
        <BreadCrubPage />
        <Title level={3}>{title}</Title>
        <Spin spinning={loading} size="large" tip="espere por favor..." indicator={loadingIcon()}>
            <Row gutter={16}>
                <Col className="gutter-row" xs={{span: 24}} lg={{span: 8}}>
                    <Image
                            width={300}
                            height={200}
                            src={tempImage !== '' ? baseURL!+tempImage : image}
                        />
                    
                    <Upload maxCount={1} onRemove={()=> onRemove()} beforeUpload={(file)=> beforeUpload(file)}>
                        <Button size='small' icon={<UploadOutlined />}>Seleccionar foto</Button>
                    </Upload>
                </Col>
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
                                name="name"
                                key="name"
                                label="Nombre"
                                rules={[
                                {
                                    required: true,
                                    message: 'el campo nombre es requerido!',
                                }
                                ]}
                            >
                                <Input name='name' />
                            </Form.Item>
                    </Col>
                        <Col className="gutter-row" xs={{span: 24}} lg={{span: 12}}>
                            <Form.Item
                                name="category_product_id"
                                key="category_product_id"
                                label="Categoría producto"
                                rules={[
                                {
                                    required: true,
                                    message: 'el campo categoría es requerido!',
                                },
                                ]}
                            >
                            <Select
                                key='s1'
                                placeholder="Seleccione categoría"
                                loading={loading}
                                showSearch
                                filterOption={(input: any, option: any) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                allowClear
                                >
                                {
                                    categories.map((c: ICategoryProduct) => (
                                    <Option key={c.id} value={c.id}>{c.name}</Option>
                                    ))
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                <Row gutter={16}>
                    <Col xs={{span: 24}} lg={{span: 16}}>
                        <Form.Item
                                name="price"
                                key="price"
                                label="Precio"
                                rules={[
                                {
                                    required: true,
                                    message: 'el campo precio es requerido!',
                                }
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }}
                                    formatter={value => `Q ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value!.replace(/\Q\s?|(,*)/g, '')}
                                />
                            </Form.Item>
                    </Col>
                    <Col xs={{span: 24}} lg={{span: 8}}>
                        <Form.Item
                                name="stock"
                                key="stock"
                                label="Stock"
                                rules={[
                                {
                                    required: true,
                                    message: 'el campo stock es requerido!',
                                },
                                ]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }}/>
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
            </Row>
            <Row gutter={16}>
                <Col span={24}>        
                    <Card title={<>
                        <PlusCircleOutlined onClick={showModal} /> Agregar detalle de materiales utilizados
                        <Divider />
                        Precio de costo: <b style={{color: 'green'}}>{getCurrencyFormat(cost_price)}</b>
                    </>}>

                        
                    <List
                        grid={{ gutter: 16, xs: 1, md: 4,lg: 4 }}
                        dataSource={detail}
                        renderItem={item => (
                        <List.Item>
                            <Card 
                                actions={[
                                    <InputNumber min={0.1} max={item.stock} value={item.quantity} onChange={(v)=>onChange(v!,item)} />,
                                    <Tooltip title="Remover material">
                                        <Button onClick={()=>removeMaterial(item)} danger type='primary' icon={<MinusCircleOutlined />} />
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
                                            <b style={{color: 'black'}}>{item.material_name} {item.stock}</b><br />
                                            <b style={{color: 'rgba(16, 142, 233, 1)'}}>Costo por unidad: {getCurrencyFormat(item.price)}</b><br />
                                            <b style={{color: 'green'}}>Costo utilizado: {getCurrencyFormat(item.cost_price)}</b>
                                        </>} 
                                />
                            </Card>
                        </List.Item>
                        )}
                    />
                    </Card>

                    
                    <Modal width={1000} title="Agregar materiales" open={isModalOpen} onCancel={onCancel} onOk={onOk}>
                        <RawMaterialPage addvisible={true} addMaterial={addMaterial} />
                    </Modal>

                    <Tooltip title="Agregar producto">
                        <FloatButton type='primary' icon={<SaveOutlined />} onClick={validate} />
                    </Tooltip>
                </Col>
            </Row>
        </Spin>
    </div>
  )
}
