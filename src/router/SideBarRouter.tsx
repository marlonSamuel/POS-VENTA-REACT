import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { CategoryProductPage } from '../pages/conf/categoryproducts/CategoryProductPage';
import { ProviderPage } from '../pages/conf/providers/ProviderPage';
import { HomePage } from '../pages/HomePage';

export const SideBarRouter = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="*" element={<Navigate to ="/" />}/>

            {/* rutas de configuración */}
           <Route path="/providers" element={<ProviderPage/>}></Route>
           <Route path="/category-products" element={<CategoryProductPage/>}></Route>
        </Routes>
    )
}
