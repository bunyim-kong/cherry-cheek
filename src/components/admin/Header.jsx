import { useLocation } from "react-router-dom";
import { UserRound } from "lucide-react";
import { useAuth } from "../../context/auth";

import "./Header.css";
import "../../styles/main.css";

// Admin page titles
const pageTitles = {
  dashboard: "Dashboard",
  products: "Products",
  categories: "Categories",
  orders: "Orders",
  customers: "Customers",
  settings: "Settings",
};

function Header() {
  const { user } = useAuth();
  // Get current URL
  const location = useLocation();

  // Get the current page name from the URL
  const currentPage = location.pathname.split("/")[2];

  // Set header title
  const pageTitle = pageTitles[currentPage] || "Admin Panel";

  return (
    <header className="admin-header">

      {/* Left Side: Page Title */}
      <div className="admin-header-title">
        <h1>{pageTitle}</h1>
      </div>

      {/* Right Side: Actions */}
      <div className="admin-header-actions">

        {/* Admin Profile */}
        <div className="admin-profile">

          <div className="admin-avatar">
            <UserRound size={20} aria-hidden="true" />
          </div>

          <div className="admin-profile-info">
            <span className="admin-name">{user.name}</span>
            <span className="admin-role">Administrator</span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;
