import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import { useAuth } from "../context/auth";

function AdminLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/account" replace />;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Header />

        <main className="p-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
