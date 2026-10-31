import { LogOut, UserRound } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
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
    <section className="account-page container">
      <div className="account-card">
        <div className="account-avatar" aria-hidden="true">
          <UserRound />
        </div>
        <p className="account-eyebrow">Your account</p>
        <h1>Hello, {user.name}</h1>
        <p className="account-email">{user.email}</p>
        <p className="account-description">
          Your demo account is saved in this browser.
        </p>
        <button className="account-logout" type="button" onClick={handleLogout}>
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </section>
  );
}
