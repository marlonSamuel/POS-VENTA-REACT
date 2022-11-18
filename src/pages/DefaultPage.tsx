import React, { useContext, useState } from 'react';

import { Avatar, Layout, Spin } from 'antd';
import { SideBarPage } from '../components/shared/SideBarPage';
import { HeaderPage } from '../components/shared/HeaderPage';
import { FooterPage } from '../components/shared/FooterPage';
import { UIContext } from '../context/UIContext';
import { AuthRouter } from '../router/AuthRouter';
import { AuthContext } from '../context/auth/AuthContext';
import { AppRouter } from '../router/AppRouter';
import { LoadingOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

export const DefaultPage = () => {
    const {logged} = useContext(AuthContext);
    const {loading} = useContext(UIContext);
    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
    const [collapsed, setCollapsed] = useState(false);
    //const antAvatar = <Avatar src="https://joeschmoe.io/api/v1/random" />
    return (
            <Layout style={{height: '100vh'}}>
                <Sider
                    className="site-layout-background"
                    breakpoint="lg"
                    collapsedWidth="0"
                    collapsible collapsed={collapsed}
                    onBreakpoint={broken => {
                        //console.log(broken);
                    }}
                    onCollapse={value => setCollapsed(value)}
                    hidden={!logged}
                >
                    {/* SIDEBAR MENU*/}
                    <SideBarPage />
                </Sider>
                <Layout>
                    {/* HEADER PAGE */}
                    <HeaderPage />

                    {/* CONTENT APP */}
                        <div className={logged ? "site-layout-background" : ''} style={{ margin: '24px 16px 0', padding: 24, height: '400%'}}>
                            <AppRouter />
                        </div>

                    {/* FOOTER PAGE */}

                    <FooterPage />
                </Layout>
            </Layout>
    )
}


