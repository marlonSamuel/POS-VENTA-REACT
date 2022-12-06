import { Line } from '@ant-design/charts';
import { Card } from 'antd';
import React,{useContext, useEffect} from 'react'
import { UIContext } from '../../context/UIContext';
import { useDashboard } from '../../hooks/useDashboard';

export const PurchasesChart = () => {
    const {loading} = useContext(UIContext);
    const {purchases,getPurchases} = useDashboard();

    useEffect(() => {
      getPurchases();
    }, [])
    

    const config = {
        data: purchases,
        width: 800,
        height: 400,
        autoFit: false,
        xField: 'fecha',
        yField: 'total',
        point: {
          size: 5,
          shape: 'diamond',
        },
        label: {
          style: {
            fill: '#aaa',
          },
        },
    };

    return (
        <Card title='COMPRAS DE ESTE AÑO'>
            <Line loading={loading} {...config} />;
        </Card>
    )
}
