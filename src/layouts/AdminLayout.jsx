import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

function AdminLayout() {
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