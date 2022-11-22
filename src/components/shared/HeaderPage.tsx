import { Header } from 'antd/lib/layout/layout'
import React, { useContext } from 'react'

import { Avatar, Button, Card, Col, Dropdown, Image, Menu, Row, Tooltip } from 'antd';
import { UIContext } from '../../context/UIContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { LogoutOutlined, MoreOutlined, UserOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';

export const HeaderPage = () => {
    const {logged, user, logout} = useContext(AuthContext);

    const menu = (
      <>
      <Card
        actions={[
          <Tooltip title="ir a perfil" color={'blue'} key={'perfil'}>
            <UserOutlined key="profile" />
          </Tooltip>,
          <Tooltip title="Salir" color={'blue'} key={'logout'}>
            <LogoutOutlined key="logout" onClick={logout} />
        </Tooltip>
          
        ]}
      >
        <Meta
            avatar={<Avatar size={60} src="https://joeschmoe.io/api/v1/random" />}
            title="Administrador"
            description={user?.name+' '+user?.lastname}
          />
      </Card>
      </>
    );

    const DropdownMenu = () => (
      <Dropdown  key="more" overlay={menu} placement="bottomRight">
        <Button type="text" style={{color: 'white'}} icon={<MoreOutlined color='white' style={{ fontSize: 20 }} />} />
      </Dropdown>
    );
    return (
      <>
        {logged &&
        <Header 
          className="site-layout-sub-header-background" 
          style={{ padding: 0, height:60}}
          /* avatar={{
            shape:"square", 
            src:'https://www.ayctraiding.com/logos/logo2.jpg',
            size: 80,
          }} */
          /* extra={[
            <DropdownMenu key="more" />,
          ]} */>
            
        </Header>}
      </>
      
    )
}
