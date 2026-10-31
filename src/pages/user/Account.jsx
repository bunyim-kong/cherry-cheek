import { LogOut, PackageOpen, UserRound } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useAuth } from "../../context/auth";
import "./Account.css";

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="account-page container">
      <header className="account-header">
        <div>
          <p className="account-eyebrow">Your account</p>
          <h1>Hello, {user.name}</h1>
          <p className="account-email">{user.email}</p>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          <LogOut size={17} aria-hidden="true" />
          Sign out
        </Button>
      </header>

      <div className="account-grid">
        <aside className="account-nav" aria-label="Account sections">
          <span className="account-nav__active" aria-current="page">
            <UserRound aria-hidden="true" />
            Account overview
          </span>
        </aside>

        <section className="orders-panel" aria-labelledby="orders-heading">
          <div className="account-section-heading">
            <p className="account-eyebrow">Order history</p>
            <h2 id="orders-heading">Your orders</h2>
          </div>

          <div className="account-empty-state">
            <div className="account-empty-state__icon" aria-hidden="true">
              <PackageOpen />
            </div>
            <h3>No orders yet</h3>
            <p>When you place an order, its details and status will appear here.</p>
            <Button to="/shop">Start shopping</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
