import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import HomePage from "./pages/user/Homepage";
import OurStory from "./pages/user/OurStory";
import About from "./pages/user/About";
import ShopPage from "./pages/user/Shop";
import Account from "./pages/user/Account";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Category from "./pages/user/Category";
import Cart from "./pages/user/Cart";
import Contact from "./pages/user/Contact";
import ProductDetail from "./pages/user/ProductDetail";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Orders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
export default function App() {
  return (
    <Routes>
      <Route path="account" element={<Account />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="category" element={<Category />} />
        <Route path="our-story" element={<OurStory />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product-detail" element={<ProductDetail />} />
        <Route path="product-detail/:productId" element={<ProductDetail />} />
      </Route>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
      </Route>
    </Routes>
  );
}
