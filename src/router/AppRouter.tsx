import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



import { AuthContext } from '../context/auth/AuthContext';
import { HomePage } from '../pages/HomePage';
import { AuthRouter } from './AuthRouter';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { SideBarRouter } from './SideBarRouter';

export const AppRouter = () => {
    //obtener estado de autenticación.
    const {logged} = useContext(AuthContext);

    return (
        <Routes>
            <Route
                path="/*"
                element={
                    <PublicRouter isAuthenticated={logged}>
                        <SideBarRouter />
                    </PublicRouter>
                }
            />
            <Route
                path="/auth/*"
                element={
                    <PrivateRouter isAuthenticated={logged}>
                        <AuthRouter />
                    </PrivateRouter>
                }
            />

            <Route path="*" element={<HomePage />} />
        </Routes>
  )
}
