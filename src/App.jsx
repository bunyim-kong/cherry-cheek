import { Navigate, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import ProductDetail from './pages/user/ProductDetail';

export default function app() {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                
                <Route index element={<ProductDetail/>} />
            </Route>
        </Routes>
    );
}
