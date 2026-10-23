import { Navigate, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import HomePage from './pages/user/Homepage';
import ShopPage from './pages/user/Shop';

export default function app() {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route index element={<HomePage />} />
                <Route path="shop" element={<ShopPage />} />
            </Route>
        </Routes>
    );
}
