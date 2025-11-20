import './RentalApp.css'
import { Navigate, Route, Routes } from "react-router-dom";

// Pages públicas
import { HomePage } from "./pages/HomePage"
import { ProductDetail } from './pages/ProductDetail';
import { FavoritesPage } from './pages/FavoritesPage';
import { BookingPage } from './pages/BookingPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { BookingHistoryPage } from './pages/BookingHistoryPage';
import { LegalPage } from './pages/LegalPage';

// Sección admin
import { AdminLogin } from './pages/AdminLogin';
import { AdminLayout } from './components/AdminLayout';
import { AdminPanel } from './pages/AdminPanel';
import { AdminProducts } from "./pages/AdminProducts";
import { AddProductPage } from './pages/AddProductPage';
import { EditProductPage } from './pages/EditProductPage';
import { ProductHighlights } from './pages/ProductHighlights';
import { AddHighlightPage } from './pages/AddHighlightPage';
import { EditHighlightPage } from './pages/EditHighlightPage';
import { CategoryPage } from './pages/CategoryPage';
import { AddCategoryPage } from './pages/AddCategoryPage';
import { UserPage } from './pages/UserPage';
import { EditUserPage } from './pages/EditUserPage';

export const RentalApp = () => {
    return (
        <>
            <Routes>

                {/* -----------Rutas públicas-------------- */}
                <Route path='/' element={<HomePage />} />
                <Route path='/detail' element={<ProductDetail />} />
                <Route path='/favorites' element={<FavoritesPage />} />
                <Route path="/reservas/:id" element={<BookingPage />} />
                <Route path="/confirmation" element={<BookingConfirmationPage />} />
                <Route path="/historial" element={<BookingHistoryPage />} />
                <Route path="/legales" element={<LegalPage />} />

                {/* -----------Admin-------------- */}
                <Route path='/administraciónLogin' element={<AdminLogin />} />

                <Route path='/administración' element={<AdminLayout />}>

                    {/* Dashboard */}
                    <Route index element={<AdminPanel />} />

                    {/* Productos */}
                    <Route path='adminProducts' element={<AdminProducts />} />
                    <Route path='addProduct' element={<AddProductPage />} />
                    <Route path='editProduct/:id' element={<EditProductPage />} />

                    {/* Características */}
                    <Route path='caracteristicas' element={<ProductHighlights />} />
                    <Route path='addHighlights' element={<AddHighlightPage />} />
                    <Route path='editHighlight/:id' element={<EditHighlightPage />} />

                    {/* Categorías */}
                    <Route path='categories' element={<CategoryPage />} />
                    <Route path='addCategory' element={<AddCategoryPage />} />

                    {/* Usuarios */}
                    <Route path='users' element={<UserPage />} />
                    <Route path='editUser/:id' element={<EditUserPage />} />
                </Route>

                {/* Si no existe, ir al home */}
                <Route path='/*' element={<Navigate to='/' />} />

            </Routes>
        </>
    )
}

// import './RentalApp.css'
// import { Navigate, Route, Routes } from "react-router-dom";

// // Pages públicas
// import { HomePage } from "./pages/HomePage"
// import { ProductDetail } from './pages/ProductDetail';
// import { FavoritesPage } from './pages/FavoritesPage';
// import { BookingPage } from './pages/BookingPage';
// import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
// import { BookingHistoryPage } from './pages/BookingHistoryPage';
// import { LegalPage } from './pages/LegalPage';

// // Sección admin
// import { AdminLogin } from './pages/AdminLogin';
// import { AdminLayout } from './components/AdminLayout';
// import { AdminPanel } from './pages/AdminPanel';
// import { AdminProducts } from "./pages/AdminProducts";
// import { AddProductPage } from './pages/AddProductPage';
// import { EditProductPage } from './pages/EditProductPage';
// import { ProductHighlights } from './pages/ProductHighlights';
// import { AddHighlightPage } from './pages/AddHighlightPage';
// import { EditHighlightPage } from './pages/EditHighlightPage';
// import { CategoryPage } from './pages/CategoryPage';
// import { AddCategoryPage } from './pages/AddCategoryPage';
// import { UserPage } from './pages/UserPage';
// import { EditUserPage } from './pages/EditUserPage';



// export const RentalApp = () => {
//     return (
//         <>
//             <Routes>

//                 {/* -----------Ruta públicas-------------- */}

//                 <Route path='/' element={<HomePage />}></Route>
//                 <Route path='/detail' element={<ProductDetail />}></Route>
//                 <Route path='/favorites' element={<FavoritesPage />}></Route>
//                 <Route path='/*' element={<Navigate to='*' />}></Route>
//                 <Route path="/reservas/:id" element={<BookingPage />} />
//                 <Route path="/confirmation" element={<BookingConfirmationPage />} />
//                 <Route path="/historial" element={<BookingHistoryPage />} />
//                 <Route path="/legales" element={<LegalPage />} />

//                 {/* -----------Admin-------------- */}
//                 <Route path='/administraciónLogin' element={<AdminLogin />} />
//                 <Route path='/administración' element={<AdminLayout />}>

//                     {/* Página principal del panel */}
//                     <Route index element={<AdminPanel />} />

//                     {/* Productos */}
//                     <Route path='adminProducts' element={<AdminProducts />} />
//                     <Route path='addProduct' element={<AddProductPage />} />
//                     <Route path='editProduct/:id' element={<EditProductPage />} />

//                     {/* Características */}
//                     <Route path='caracteristicas' element={<ProductHighlights />} />
//                     <Route path='addHighlights' element={<AddHighlightPage />} />
//                     <Route path='editHighlight/:id' element={<EditHighlightPage />} />

//                     {/* Categorías */}
//                     <Route path='categories' element={<CategoryPage />} />
//                     <Route path='addCategory' element={<AddCategoryPage />} />

//                     {/* Usuarios */}
//                     <Route path='users' element={<UserPage />} />
//                     <Route path='editUser/:id' element={<EditUserPage />} />

//                 </Route>

//                 <Route path='/administraciónLogin' element={<AdminLogin />}></Route>
//                 {/* <Route path='/administración' element={<AdminPanel />}></Route> */}
//                 {/* <Route path='/adminProducts' element={<AdminProducts />}></Route> */}
//                 {/* <Route path='/addProduct' element={<AddProductPage />}></Route> */}
//                 {/* <Route path='/caracteristicas' element={<ProductHighlights />}></Route> */}
//                 {/* <Route path='/addHighlights' element={<AddHighlightPage />}></Route> */}
//                 {/* <Route path='/editHighlight/:id' element={<EditHighlightPage />}></Route> */}
//                 {/* <Route path='/editProduct/:id' element={<EditProductPage />} /> */}
//                 {/* <Route path='/addCategory' element={<AddCategoryPage />}></Route> */}
//                 {/* <Route path='/categories' element={<CategoryPage />}></Route> */}
//                 {/* <Route path='/users' element={<UserPage />}></Route> */}
//                 {/* <Route path='/editUser/:id' element={<EditUserPage />} /> */}

//                 {/* <Route path="*" component={NotFound} /> */}
//                 <Route path='/*' element={<Navigate to='/' />} />
//             </Routes>
//         </>
//     )
// }
// /* function NotFound() {
//     return <>Ha llegado a una página que no existe</>;
//   } */