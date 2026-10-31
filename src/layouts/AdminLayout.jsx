import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import { useAuth } from "../context/auth";

function AdminLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/account" replace />;

  return (
    <div className="flex min-h-screen min-h-dvh bg-[var(--page-bg)]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="min-w-0 flex-1 px-[35px] py-[15px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
