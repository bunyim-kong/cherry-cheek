import { Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import HomePage from './pages/user/Homepage';
import OurStory from './pages/user/OurStory';
import About from './pages/user/About';
import ShopPage from './pages/user/Shop';

export default function app() {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route index element={<HomePage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="our-story" element={<OurStory />} />
                <Route path="about" element={<About />} />
            </Route>
        </Routes>
    );
}
