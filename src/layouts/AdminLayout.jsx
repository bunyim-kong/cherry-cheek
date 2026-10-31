import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import { useAuth } from "../context/auth";
import "./AdminLayout.css";

function AdminLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/account" replace />;

  return (
    <div className="admin-shell">
      <Sidebar />

      <div className="admin-content">
        <Header />

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
