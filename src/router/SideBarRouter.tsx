import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { CategoryProductPage } from '../pages/conf/categoryproducts/CategoryProductPage';
import { ProviderPage } from '../pages/conf/providers/ProviderPage';
import { HomePage } from '../pages/HomePage';
import { CreateOrEditPage } from '../pages/inventory/product/CreateOrEditPage';
import { ProductPage } from '../pages/inventory/product/ProductPage';
import { RawMaterialPage } from '../pages/inventory/rawmaterial/RawMaterialPage';

export const SideBarRouter = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="*" element={<Navigate to ="/" />}/>

            {/* rutas de configuración */}
           <Route path="/providers" element={<ProviderPage/>}></Route>
           <Route path="/category-products" element={<CategoryProductPage/>}></Route>
           <Route path="/raw-materials" element={<RawMaterialPage/>}></Route>
           <Route path="/products" element={<ProductPage/>}></Route>
           <Route path="/new-product" element={<CreateOrEditPage/>}></Route>
           <Route path="/edit-product/:id" element={<CreateOrEditPage/>}></Route>
        </Routes>
    )
}
