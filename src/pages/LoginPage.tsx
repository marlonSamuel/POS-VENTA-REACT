import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, Row } from 'antd';
import { useContext, useEffect} from 'react';
import { AuthContext } from '../context/auth/AuthContext';

import Swal from 'sweetalert2';
import { UIContext } from '../context/UIContext';


interface IForm {
    username: string;
    password: string;
    rememberme: boolean
}

export const LoginPage = () => {
    const {login, errorMessage, removeError} = useContext(AuthContext);
    const { setLoading } = useContext(UIContext);

    useEffect(() => {
      if(errorMessage.length == 0) return;
      Swal.fire('Error', errorMessage,'error');
      removeError();

    }, [errorMessage])
    
    
    const onFinish = async(data: IForm) => {
        setLoading(true);
        const resp = await login(data);
        /* if(!resp){
            Swal.fire('Error', 'Verifique el usuario y contraseña','error');
        } */
        setLoading(false);
    };

    return (
        <div className='main-login'>
        <Row >
            <Col>
            <Card
                size='small'
                style={{ width: 350, padding: 4}}
                cover={
                    <img
                        style={{height: 200}}
                        alt="logo-ge"
                        src="https://www.ayctraiding.com/logos/logo2.jpg"
                    />
                }
            >
                
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'usuario es requerido!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="usuario" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Constraseña es requerida!' }]}
                    >
                        <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="contraseña"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Recuerdame</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                        Olvide mi contraseña
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button">
                        Ingresar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            </Col>
        </Row>
        
        </div>
        
        
  )
}
