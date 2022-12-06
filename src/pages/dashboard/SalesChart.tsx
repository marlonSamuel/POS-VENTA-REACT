import React, { useContext, useEffect } from 'react'
import { Line } from '@ant-design/plots';
import { useDashboard } from '../../hooks/useDashboard';
import { Card } from 'antd';
import { UIContext } from '../../context/UIContext';

export const SalesChart = () => {
    const {loading} = useContext(UIContext);
    const {sales,getSales} = useDashboard();

    const data = [

        {fecha:'01-2022',total:400,type:'compras'},
        {fecha:'01-2022',total:600,type:'ventas'},
        {fecha:'02-2022',total:700,type:'compras'},
        {fecha:'02-2022',total:1000,type:'ventas'},
        {fecha:'03-2022',total:700,type:'compras'},
        {fecha:'04-2022',total:700,type:'compras'},
        {fecha:'04-2022',total:1000,type:'ventas'},
    ]

    useEffect(() => {
      getSales()
    }, [])
    

    const config = {
        data,
        width: 800,
        height: 400,
        autoFit: false,
        xField: 'fecha',
        yField: 'total',
        seriesField: 'type',
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
        <Card title='VENTAS DE ESTE AÑO'>
            <Line loading={loading} {...config} />
        </Card>
    )
}
