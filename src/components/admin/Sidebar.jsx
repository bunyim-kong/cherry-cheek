import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

import {
  LayoutDashboard,
  Package,
  Grid2X2,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import "../../styles/main.css";
import "./Sidebar.css";

// Sidebar menu items
const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: Grid2X2,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: Users,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="admin-sidebar">

      {/* Sidebar Logo */}
      <div className="sidebar-logo">
        <h2>
          Cherry <span>Cheeks</span>
        </h2>
        <p>ADMIN WORKPLACE</p>
      </div>

      {/* Sidebar Navigation */}
      <nav className="sidebar-nav" aria-label="Admin navigation">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <Icon size={20} aria-hidden="true" />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Sidebar */}
      <div className="sidebar-bottom">
        <button type="button" onClick={handleLogout} className="sidebar-link">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;
