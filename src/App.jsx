import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';

export default function app() {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                
            </Route>
        </Routes>
    );
}
