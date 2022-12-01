import { LoadingOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Spin, Row, Col, InputNumber } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMovement } from '../../hooks/useMovement';
import { IMovement } from '../../interfaces/ISaleShop';


interface IForm {
  visible: boolean,
  onFinish: (success: boolean)=> void,
  formData: IMovement
}

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

export const CreateOrEdit = ({ visible, onFinish, formData }: IForm) => {
  let { type } = useParams();
  const [form] = Form.useForm();
  const {create, update} = useMovement();
  const [title, setTitle] = useState('Nuevo registro');
  const [confirmLoading, setConfirmLoading] = useState(false);

  //evaluando para setear el titulo y la data a editar
  useEffect(() => {
    form.setFieldsValue(formData);
    setTitle( formData.id > 0 ? 'Editar '+(type == 'i' ? 'ingreso':'gasto')
          :'Nuevo '+(type == 'i' ? 'ingreso':'gasto'));
    console.log(formData)
  }, [formData, type])
  
  const onCreate = async(values: any) => {
    values.movement_type = type;
    setConfirmLoading(true);
    if(formData.id == 0){
     const resp = await create(values);
     if(resp) onFinish(true);
    }else{
      values = {
        ...values,
        id: formData.id
      }
     const resp = await update(values);
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

  return (
      <Modal
        open={visible}
        forceRender
        title={title}
        footer={[
          <Spin key="spin" spinning={confirmLoading} size="large" tip="cargando...">
            <Button key="cancel" size='small' onClick={onReturn} icon={<UndoOutlined/>} type='primary' danger>
                  Volver
            </Button>
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
          <Row gutter={16}>
            <Col xs={{span: 24}} lg={{span: 12}}>
              <Form.Item
                name="date"
                key="date"
                label="Fecha"
                rules={[
                  {
                    required: true,
                    message: 'el campo fecha es requerido!',
                  },
                ]}
              >
                <Input type='date' />
              </Form.Item>
            </Col>
            <Col xs={{span: 24}} lg={{span: 12}}>
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
      </Modal>
  )
}
