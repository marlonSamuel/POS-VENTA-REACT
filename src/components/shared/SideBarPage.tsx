import { Avatar, Divider, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React from 'react'

import { BankOutlined, CheckOutlined, CustomerServiceOutlined, DashboardOutlined, DollarCircleFilled, DollarCircleOutlined, DollarOutlined, FieldTimeOutlined, FilePdfOutlined, MessageOutlined, NotificationOutlined, PhoneFilled, PhoneOutlined, QrcodeOutlined, SettingOutlined, ShopOutlined, ShoppingCartOutlined, TransactionOutlined, UploadOutlined, UsergroupAddOutlined, UserOutlined, VideoCameraAddOutlined, VideoCameraOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';

export const SideBarPage = () => {
  return (
    <>
    <div className="logo" >
          <>
          <Avatar size={64} icon={<UserOutlined />} />
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
          <Menu.Item key="s22" icon={<CheckOutlined />}>Productos</Menu.Item>
        </SubMenu>

        <SubMenu key="sub3" icon={<DollarCircleFilled />} title="Gastos">
          <Menu.Item key="s31" icon={<ShoppingCartOutlined />}>Compras</Menu.Item>
          <Menu.Item key="s32" icon={<DollarOutlined />}>Otros gastos</Menu.Item>
        </SubMenu>

        <SubMenu key="sub4" icon={<DollarCircleOutlined />} title="Ingresos">
          <Menu.Item key="s41" icon={<ShoppingCartOutlined />}>POS - VENTA</Menu.Item>
          <Menu.Item key="s42" icon={<DollarOutlined />}>Otros ingresos</Menu.Item>
        </SubMenu>

        <Menu.Item key="m2" icon={<FilePdfOutlined />}>
          <Link to="/home">
              REPORTES
          </Link>
        </Menu.Item>
    </Menu></>
  )
}
