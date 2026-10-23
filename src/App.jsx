import { Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import HomePage from './pages/user/Homepage';
import OurStory from './pages/user/OurStory';
import ShopPage from './pages/user/Shop';

import Login from './pages/User/Login';

export default function App() {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route index element={<HomePage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="our-story" element={<OurStory />} />
            </Route>
        </Routes>
    );
}