import { Divider } from 'antd'
import React from 'react'
import { CountPage } from './dashboard/CountPage'
import { SalesVsPurchases } from './dashboard/SalesVsPurchases'

export const HomePage = () => {
  return (
    <div>
      <CountPage />
      <Divider />
      <SalesVsPurchases />
    </div>
  )
}
