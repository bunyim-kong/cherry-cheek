import { Navigate, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import HomePage from './pages/user/Homepage';
import Cart from "./pages/user/Cart";   
export default function App() {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route index element={<HomePage />} />
                <Route path="cart" element={<Cart />} />
            </Route>
        </Routes>
    );
}
