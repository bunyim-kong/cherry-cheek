import { LogOut, PackageCheck, PackageOpen, UserRound } from "lucide-react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import "./Account.css";

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function formatOrderDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

export default function Account() {
  const { user, logout } = useAuth();
  const { orders } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
      {searchParams.get("order") === "success" && (
        <div className="account-success" role="status">
          <PackageCheck aria-hidden="true" />
          <div>
            <strong>Your order is confirmed</strong>
            <span>
              Order {searchParams.get("id") || "confirmation"} has been added to your history.
            </span>
          </div>
        </div>
      )}

      <header className="account-header">
        <div>
          <p className="account-eyebrow">Your profile</p>
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
            Profile overview
          </span>
        </aside>

        <section className="orders-panel" aria-labelledby="orders-heading">
          <div className="account-section-heading">
            <p className="account-eyebrow">Order history</p>
            <h2 id="orders-heading">Your orders</h2>
          </div>

          {orders.length === 0 ? (
            <div className="account-empty-state">
              <div className="account-empty-state__icon" aria-hidden="true">
                <PackageOpen />
              </div>
              <h3>No orders yet</h3>
              <p>When you place an order, its details and status will appear here.</p>
              <Button to="/shop">Start shopping</Button>
            </div>
          ) : (
            <div className="account-orders">
              {orders.map((order) => (
                <article className="account-order" key={order.id}>
                  <div className="account-order__header">
                    <span>
                      <small>Order</small>
                      <strong>{order.id}</strong>
                    </span>
                    <span>
                      <small>Date</small>
                      <strong>{formatOrderDate(order.placedAt)}</strong>
                    </span>
                    <span>
                      <small>Total</small>
                      <strong>{formatCurrency(order.total)}</strong>
                    </span>
                    <em>{order.status}</em>
                  </div>

                  <div className="account-order__body">
                    <div className="account-order__products">
                      {order.items.map((item) => (
                        <span className="account-order__product" key={item.id}>
                          <img src={item.image} alt={item.name} width="58" height="58" />
                          <small>{item.quantity}</small>
                        </span>
                      ))}
                    </div>
                    <p>
                      Delivering to {[order.shippingAddress.city, order.shippingAddress.country].filter(Boolean).join(", ")} · {order.paymentMethod === "qr" ? "QR payment" : "Card payment"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
