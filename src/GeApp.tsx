import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth/AuthContext'
import { UIProvider } from './context/UIContext'
import { DefaultPage } from './pages/DefaultPage'

export const GeApp = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
              <UIProvider>
                <DefaultPage />
              </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
