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
import { UserPage } from './pages/UserPage';
import { EditUserPage } from './pages/EditUserPage';
import { AdminLogin } from './pages/AdminLogin';
import { FavoritesPage } from './pages/FavoritesPage';
import { BookingPage } from './pages/BookingPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { BookingHistoryPage } from './pages/BookingHistoryPage';
import { LegalPage } from './pages/LegalPage';


export const RentalApp = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/detail' element={<ProductDetail />}></Route>
                <Route path='/administraciónLogin' element={<AdminLogin />}></Route>
                <Route path='/administración' element={<AdminPanel />}></Route>
                <Route path='/adminProducts' element={<AdminProducts />}></Route>
                <Route path='/addProduct' element={<AddProductPage />}></Route>
                <Route path='/caracteristicas' element={<ProductHighlights />}></Route>
                <Route path='/addHighlights' element={<AddHighlightPage />}></Route>
                <Route path='/editHighlight/:id' element={<EditHighlightPage />}></Route>
                <Route path='/editProduct/:id' element={<EditProductPage />} />
                <Route path='/addCategory' element={<AddCategoryPage />}></Route>
                <Route path='/categories' element={<CategoryPage />}></Route>
                <Route path='/users' element={<UserPage />}></Route>
                <Route path='/editUser/:id' element={<EditUserPage />} />
                <Route path='/favorites' element={<FavoritesPage />}></Route>
                <Route path='/*' element={<Navigate to='*' />}></Route>
                <Route path="/reservas/:id" element={<BookingPage />} />
                <Route path="/confirmation" element={<BookingConfirmationPage />} />
                <Route path="/historial" element={<BookingHistoryPage />} />
                <Route path="/legales" element={<LegalPage />} />
                {/* <Route path="*" component={NotFound} /> */}
            </Routes>
        </>
    )
}
/* function NotFound() {
    return <>Ha llegado a una página que no existe</>;
  } */