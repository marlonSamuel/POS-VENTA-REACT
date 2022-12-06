import { Card } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { UIContext } from '../../context/UIContext';
import { useDashboard } from '../../hooks/useDashboard'
import { Line } from '@ant-design/plots';
import { getCurrencyFormat } from '../../helpers/shared';

export const SalesVsPurchases = () => {
    const {loading} = useContext(UIContext);
    const {sales, getSales, purchases, getPurchases} = useDashboard();
    const [data,setData] = useState<any[]>([]);

    useEffect(() => {
      getAll()
    }, [])

    useEffect(()=>{
        const _sales = sales.map((obj:any) => ({ ...obj, type: 'VENTAS' }))
        const _purchases = purchases.map((obj:any) => ({ ...obj, type: 'COMPRAS' }))
        let n_data = [..._sales,..._purchases]
        n_data = n_data.sort((a, b) => {
            return parseFloat(a.total) - parseFloat(b.total);
          });
        console.log(n_data)
        setData(n_data)
    },[sales,purchases])

    const getAll = async()=>{
        await Promise.all([getSales(),getPurchases()]);
    }

    const config = {
        data,
        autoFit: true,
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
        color: ['green', 'red']
    };
    
  return (
    <Card title='VENTAS VS COMPRAS DE ESTE AÑO'>
        <Line loading={loading} {...config} />
    </Card>
  )
}
