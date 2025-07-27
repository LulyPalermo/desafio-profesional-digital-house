import './RentalApp.css'
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage"
import { AdminProducts } from "./pages/AdminProducts";
import { ProductDetail } from './pages/ProductDetail';
import { AddProductPage } from './pages/AddProductPage';
import { AdminPanel } from './pages/AdminPanel';
import { ProductHighlights } from './pages/ProductHighlights';
import { AddHighlightPage } from './pages/AddHighlightPage';
import { EditProductPage } from './pages/EditProductPage';
import { AddCategoryPage } from './pages/AddCategoryPage';
import { CategoryPage } from './pages/CategoryPage';
import { EditHighlightPage } from './pages/EditHighlightPage';


export const RentalApp = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/detail' element={<ProductDetail />}></Route>
                <Route path='/administración' element={<AdminPanel />}></Route>
                <Route path='/adminProducts' element={<AdminProducts />}></Route>
                <Route path='/addProduct' element={<AddProductPage />}></Route>
                <Route path='/caracteristicas' element={<ProductHighlights />}></Route>
                <Route path='/addHighlights' element={<AddHighlightPage />}></Route>
                <Route path='/editHighlight/:id' element={<EditHighlightPage />}></Route>
                <Route path='/editProduct/:id' element={<EditProductPage />} />
                <Route path='/addCategory' element={<AddCategoryPage />}></Route>
                <Route path='/categories' element={<CategoryPage />}></Route>
                <Route path='/*' element={<Navigate to='*' />}></Route>
                {/* <Route path="*" component={NotFound} /> */}
            </Routes>
        </>
    )
}
/* function NotFound() {
    return <>Ha llegado a una página que no existe</>;
  } */