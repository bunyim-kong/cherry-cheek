import { Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Homepage from "./pages/user/Homepage";
import Cart from "./pages/user/Cart";

export default function App() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<Homepage />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}
