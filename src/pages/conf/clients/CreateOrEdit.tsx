import { LoadingOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useContext, useEffect, useState } from 'react';
import { UIContext } from '../../../context/UIContext';
import { IClient } from '../../../interfaces/ISaleShop';
import { useClient } from '../../../hooks/useClient';


interface IForm {
  visible: boolean,
  onFinish: (success: boolean)=> void,
  formData: IClient
}

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

export const CreateOrEdit = ({ visible, onFinish, formData }: IForm) => {

  const [form] = Form.useForm();
  const {create, update} = useClient();
  const [title, setTitle] = useState('Nuevo registro');
  const [confirmLoading, setConfirmLoading] = useState(false);

  //evaluando para setear el titulo y la data a editar
  useEffect(() => {
    form.setFieldsValue(formData);
    setTitle( formData.id > 0 ? 'Editar registro '+formData.names: 'Nuevo registro');
  }, [formData])
  
  const onCreate = async(values: any) => {
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
        width={800}
        open={visible}
        forceRender
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
          
          <Row gutter={16}>
            <Col className="gutter-row" xs={{span: 24}} lg={{span: 12}}>
                
                <Form.Item
                      name="names"
                      key="names"
                      label="Nombres"
                      rules={[
                        {
                          required: true,
                          message: 'el campo nombres es requerido!',
                        },
                      ]}
                    >
                      <Input name='names' />
                  </Form.Item>
              </Col>

              <Col className="gutter-row" xs={{span: 24}} lg={{span: 12}}>
                
                <Form.Item
                      name="last_names"
                      key="last_names"
                      label="Apellidos"
                      rules={[
                        {
                          required: true,
                          message: 'el campo apellidos es requerido!',
                        },
                      ]}
                    >
                      <Input name='last_names' />
                  </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row" xs={{span: 24}} lg={{span: 12}}>
                
                <Form.Item
                      name="cui"
                      key="cui"
                      label="CUI"
                      rules={[
                        {
                          required: true,
                          message: 'el campo cui es requerido!',
                        },
                      ]}
                    >
                      <Input name='cui' />
                  </Form.Item>
              </Col>

              <Col className="gutter-row" xs={{span: 24}} lg={{span: 12}}>
                
                <Form.Item
                      name="nit"
                      key="nit"
                      label="NIT"
                      rules={[
                        {
                          required: true,
                          message: 'el campo nit es requerido!',
                        },
                      ]}
                    >
                      <Input name='nit' />
                  </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row" xs={{span: 24}} lg={{span: 12}}>
                <Form.Item
                      name="cellphone"
                      key="cellphone"
                      label="Teléfono"
                      rules={[
                        {
                          required: true,
                          message: 'el campo teléfono es requerido!',
                        },
                      ]}
                    >
                      <Input type='number' name='cellphone' />
                  </Form.Item>
              </Col>

              <Col className="gutter-row" xs={{span: 24}} lg={{span: 12}}>
                
                <Form.Item
                      name="email"
                      key="email"
                      label="Correo electrónico"
                    >
                      <Input name='email' />
                  </Form.Item>
            </Col>
          </Row>
          

      <Row gutter={16}>
          <Col className="gutter-row" xs={{span: 24}} lg={{span: 8}}>
                <Form.Item
                      name="birthday"
                      key="birthday"
                      label="Fecha de nacimiento"
                      rules={[
                        {
                          required: true,
                          message: 'el campo fecha de nacimiento es requerido!',
                        },
                      ]}
                    >
                      <Input type='date' name='birthday' />
                  </Form.Item>
              </Col>

        <Col className="gutter-row" xs={{span: 24}} lg={{span: 16}}>   
          <Form.Item
                name="dir"
                key="dir"
                label="Dirección"
                rules={[
                  {
                    required: true,
                    message: 'el dirección observaciones es requerido!',
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
