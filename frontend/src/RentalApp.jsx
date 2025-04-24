import './RentalApp.css'
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage"
import { AdminProducts } from "./pages/AdminProducts";
import { ProductDetail } from './pages/ProductDetail';
import { AddProductPage } from './pages/AddProductPage';
import { AdminPanel } from './pages/AdminPanel';


export const RentalApp = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/detail' element={<ProductDetail />}></Route>
                <Route path='/administración' element={<AdminPanel />}></Route>
                <Route path='/adminProducts' element={<AdminProducts />}></Route>
                <Route path='/addProduct' element={<AddProductPage />}></Route>
                <Route path='/*' element={<Navigate to='*' />}></Route>
                {/* <Route path="*" component={NotFound} /> */}
            </Routes>
        </>
    )
}
/* function NotFound() {
    return <>Ha llegado a una página que no existe</>;
  } */