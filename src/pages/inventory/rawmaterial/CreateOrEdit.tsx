import { LoadingOutlined, SaveOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Image, Input, InputNumber, Modal, Row, Spin, Upload, UploadProps } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect, useState } from 'react';
import { notificationMessage } from '../../../helpers/shared';
import { useCategoryProduct } from '../../../hooks/useCategoryProduct';
import { useProvider } from '../../../hooks/useProvider';
import { useRawMaterial } from '../../../hooks/useRawMaterial';
import { ICategoryProduct } from '../../../interfaces/IConf';
import { IRawMaterial } from '../../../interfaces/IInventory';

const baseURL = process.env.REACT_APP_API_URL;
interface IForm {
  visible: boolean,
  onFinish: (success: boolean)=> void,
  formData: IRawMaterial
}

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

export const CreateOrEdit = ({ visible, onFinish, formData }: IForm) => {

  const [form] = Form.useForm();
  const {create, update} = useRawMaterial();
  const [title, setTitle] = useState('Nuevo registro');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState();
  const [tempImage, setTemImage] = useState('');

  //evaluando para setear el titulo y la data a editar
  useEffect(() => {
    form.setFieldsValue(formData);
    setTitle( formData.id > 0 ? 'Editar registro '+formData.name: 'Nuevo registro');
    if(formData.image !== '') setTemImage(formData.image!)
  }, [formData])
  
  const onCreate = async(values: any) => {
    setConfirmLoading(true);
    const _values = new FormData();
    _values.append('image', imageFile!);
    _values.append('name', values.name);
    _values.append('description', values.description);
    _values.append('price', values.price);
    _values.append('stock', values.stock);
    if(formData.id == 0){
        const resp = await create(_values);
        if(resp) onFinish(true);
    }else{
        _values.append('id', formData.id.toString());
        const resp = await update(_values);
        if(resp) onFinish(true);
    }
    setConfirmLoading(false);
  }
  
  //volver
  const onReturn = () => {
    form.resetFields();
    onFinish(false);
  }

  //pre validación antes de en enviar.
  const validate = () => {
    form.validateFields().then((values) => {
        //form.resetFields();
        onCreate(values);
    }).catch(e=>{

    });
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
        if(formData.image !== '')setTemImage(formData.image!)
    }


  return (
      <Modal
        open={visible}
        forceRender
        width={600}
        title={title}
        footer={[
          <Spin key="spin" spinning={confirmLoading} size="large" tip="cargando...">
            <Button key="cancel" size='small' onClick={onReturn} icon={<UndoOutlined/>} type='primary' danger>
                  Volver
            </Button>,
            <Button key="save" size='small' onClick={validate} icon={<SaveOutlined/>} type='primary'>
              Guardar
            </Button>,
          </Spin>
        ]}
        onCancel={()=>onFinish(false)}
        onOk={validate}
      >
      
        <Form
          form={form}
          key="form"
          layout="vertical"
          name="form_in_modal"
          size='small'
        >
          <Form.Item
            name="name"
            key="name"
            label="Nombre"
            rules={[
              {
                required: true,
                message: 'el campo nombre es requerido!',
              },
            ]}
          >
            <Input name='name' />
          </Form.Item>

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
          <Row>
          <Upload maxCount={1} onRemove={()=> onRemove()} beforeUpload={(file)=> beforeUpload(file)}>
            <Button size='small' icon={<UploadOutlined />}>Seleccionar imagen</Button>
           </Upload>
           
          <Image
                width={200}
                src={tempImage !== '' ? baseURL!+formData.image : image}
            />
          </Row>
        </Form>
      
      </Modal>
  )
}
