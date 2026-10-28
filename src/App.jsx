import { Navigate, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import HomePage from './pages/user/Homepage';
import OurStory from './pages/user/OurStory';
import About from './pages/user/About';
import ShopPage from './pages/user/Shop';
import Account from './pages/user/Account';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Checkout from './pages/user/Checkout';

export default function App() {
    return (
        <Routes>
            <Route path="account" element={<Account />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<UserLayout />}>
                <Route index element={<HomePage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="category" element={<Navigate to="/shop" replace />} />
                <Route path="our-story" element={<OurStory />} />
                <Route path="about" element={<About />} />
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes>
    );
}
