import React, { useContext, useEffect } from 'react'
import { Avatar, Badge, Space, Tooltip } from 'antd';
import { LoadingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { SPContext } from '../context/shop/ShopContext';
import { useNavigate } from 'react-router-dom';

export const ShopSalePage = () => {
    const history = useNavigate();
    const {isShop} = useContext(SPContext);

    const goToPage=(type: string)=>{
        if(type === 'p' && isShop){
            history('/main-shop')
        }
        /* if(type === 's' && isSale){
            history('/main-shop')
        } */
    }
    return (
        <div style={{textAlign:'right', padding: 24}}>
            <span className="avatar-item">
                <Space>
                    <Tooltip title='Compras'>
                        <Badge count={isShop ? 1 : 0}>
                            <Avatar style={{ backgroundColor: '#87d068' }} shape="square" 
                            icon={<ShoppingCartOutlined 
                            onClick={()=>goToPage('p')} />} />
                        </Badge>
                    </Tooltip>
                    <Tooltip title='Ventas'>
                        <Badge count={0} >
                            <Avatar style={{ backgroundColor: '#1890ff' }} shape="square"  icon={<ShoppingCartOutlined />} />
                        </Badge>
                    </Tooltip>
                </Space>
            </span>
        </div>
    )
}
