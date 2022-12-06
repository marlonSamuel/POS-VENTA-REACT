import { Avatar, Divider, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React, { useContext } from 'react'

import { LogoutOutlined, CheckOutlined, UserAddOutlined, DashboardOutlined, DollarCircleFilled, DollarCircleOutlined, DollarOutlined, FieldTimeOutlined, FilePdfOutlined, MessageOutlined, NotificationOutlined, PhoneFilled, PhoneOutlined, QrcodeOutlined, SettingOutlined, ShopOutlined, ShoppingCartOutlined, TransactionOutlined, UploadOutlined, UsergroupAddOutlined, UserOutlined, VideoCameraAddOutlined, VideoCameraOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';

export const SideBarPage = () => {
  const {logout, user} = useContext(AuthContext);
  return (
    <>
    <div className="logo" >
          <>
          <Avatar size={64} icon={<UserOutlined />} />
          <br />
          <b style={{color: 'rgb(112, 104, 62)'}}>
            
            Administrador <br />
            {user?.name +' '+user?.lastname} 
          </b>
          </>   
      </div>
      <Divider style={{marginBottom: '4px'}} />
    <Menu mode="inline" defaultSelectedKeys={['m1']}>
        <Menu.Item key="m1" icon={<DashboardOutlined />}>
          <Link to="/home">
              Inicio
          </Link>
        </Menu.Item>

        <SubMenu key="sub1" icon={<SettingOutlined />} title="Configuración">
          <Menu.Item key="s1" icon={<UsergroupAddOutlined />}><Link to="/providers"> Proveedores</Link></Menu.Item>
          <Menu.Item key="s2" icon={<CheckOutlined />}><Link to="/category-products"> Categoría productos</Link></Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" icon={<QrcodeOutlined />} title="Inventario">
          <Menu.Item key="s21" icon={<CheckOutlined />}><Link to="/raw-materials"> Materia prima</Link></Menu.Item>
          <Menu.Item key="s22" icon={<CheckOutlined />}><Link to="/products"> Productos</Link></Menu.Item>
        </SubMenu>

        <SubMenu key="sub3" icon={<DollarCircleFilled />} title="Gastos">
          <Menu.Item key="s31" icon={<ShoppingCartOutlined />}><Link to="/purchases"> Compras</Link></Menu.Item>
          <Menu.Item key="s32" icon={<DollarOutlined />}><Link to="/outcomes/o"> Otros gastos</Link></Menu.Item>
        </SubMenu>

        <SubMenu key="sub4" icon={<DollarCircleOutlined />} title="Ingresos">
          <Menu.Item key="s41" icon={<ShoppingCartOutlined />}><Link to="/sales"> Ventas</Link></Menu.Item>
          <Menu.Item key="s42" icon={<DollarOutlined />}><Link to="/incomes/i"> Otros ingresos</Link></Menu.Item>
        </SubMenu>
{/* 
        <SubMenu key="sub5" icon={<UserOutlined />} title="Usuario">
          <Menu.Item key="s51" icon={<UserAddOutlined />}>Usuarios</Menu.Item>
          <Menu.Item key="s52" icon={<UserOutlined />}>Mi perfil</Menu.Item>
        </SubMenu> */}

        <Menu.Item key="m2" icon={<FilePdfOutlined />}>
          <Link to="/reports">
              REPORTES
          </Link>
        </Menu.Item>
        <Menu.Item onClick={logout} key="m4" icon={<LogoutOutlined />}>
              SALIR
        </Menu.Item>
    </Menu></>
  )
}
