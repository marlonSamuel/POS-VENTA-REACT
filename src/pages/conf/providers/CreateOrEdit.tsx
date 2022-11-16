import { LoadingOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useContext, useEffect, useState } from 'react';
import { UIContext } from '../../../context/UIContext';
import { useProvider } from '../../../hooks/userProvider';
import { IProvider } from '../../../interfaces/IConf';


interface IForm {
  visible: boolean,
  onFinish: (success: boolean)=> void,
  formData: IProvider
}

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

export const CreateOrEdit = ({ visible, onFinish, formData }: IForm) => {

  const [form] = Form.useForm();
  const {create, update} = useProvider();
  const [title, setTitle] = useState('Nuevo registro');
  const [confirmLoading, setConfirmLoading] = useState(false);

  //evaluando para setear el titulo y la data a editar
  useEffect(() => {
    form.setFieldsValue(formData);
    setTitle( formData.id > 0 ? 'Editar registro '+formData.name: 'Nuevo registro');
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
        visible={visible}
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
            name="observation"
            key="observation"
            label="Observaciones"
            rules={[
              {
                required: true,
                message: 'el campo observaciones es requerido!',
              },
            ]}
          >
            <TextArea rows={2} />
          </Form.Item>
        </Form>
      
      </Modal>
  )
}
