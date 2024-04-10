import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { CategoryProductPage } from '../pages/conf/categoryproducts/CategoryProductPage';
import { ProviderPage } from '../pages/conf/providers/ProviderPage';
import { HomePage } from '../pages/HomePage';
import { CreateOrEditPage } from '../pages/inventory/product/CreateOrEditPage';
import { ProductPage } from '../pages/inventory/product/ProductPage';
import { RawMaterialPage } from '../pages/inventory/rawmaterial/RawMaterialPage';
import { MainSale } from '../pages/sale/MainSale';
import { Index as IndexPurchase } from '../pages/shopping/Index';
import { Index as IndexSale } from '../pages/sale/Index';
import { MainShop } from '../pages/shopping/MainShop';
import { MovementPage } from '../pages/movement/MovementPage';
import { ContextReportPage, ReportPage } from '../pages/reports/ReportPage';
import { ClientPage } from '../pages/conf/clients/ClientPage';

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
           <Route path="/main-shop" element={<MainShop/>}></Route>
           <Route path="/purchases" element={<IndexPurchase/>}></Route>

           <Route path="/main-sale" element={<MainSale/>}></Route>
           <Route path="/sales" element={<IndexSale/>}></Route>
           <Route path="/clients" element={<ClientPage/>}></Route>
           <Route path="/incomes/:type" key={'income'} element={<MovementPage/>}></Route>
           <Route path="/outcomes/:type" key={'outcomes'} element={<MovementPage/>}></Route>

           <Route path="/reports" key={'report'} element={<ContextReportPage />}></Route>
           
        </Routes>
    )
}
