import { Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cart";
import "./Cart.css";
import "../../styles/main.css";

const FREE_DELIVERY_THRESHOLD = 80;
const STANDARD_DELIVERY_FEE = 6;

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function Cart() {
  const {
    cartItems,
    cartCount,
    subtotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main>
        <section className="container-shopping">
          <div className="shopping-content">
            <h1 className="shopping-title">It&apos;s quiet in here</h1>
            <p className="shopping-description">
              Explore our edit and choose the next step in your routine.
            </p>
            <Link to="/shop" className="shopping-btn">
              Shop skincare
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const delivery =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  const total = subtotal + delivery;
  const amountUntilFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - subtotal,
  );

  return (
    <main>
      <section className="container shopping-container">
        <div className="shopping-bag-header">
          <p className="shopping-subtitle">YOUR SELECTION</p>
          <h1 className="shopping-bag-title">Shopping bag</h1>
          <p className="shopping-bag-count">
            {cartCount} {cartCount === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="container-product-order">
          <div className="product-state">
            {cartItems.map((product) => (
              <article className="shopping-product" key={product.id}>
                <Link
                  className="shopping-product-image"
                  to={`/product-detail/${product.id}`}
                  aria-label={`View ${product.name}`}
                >
                  <img src={product.image} alt={product.name} />
                </Link>

                <div className="shopping-product-info">
                  <p className="shopping-product-brand">{product.brand}</p>
                  <h2 className="shopping-product-name">
                    <Link to={`/product-detail/${product.id}`}>
                      {product.name}
                    </Link>
                  </h2>
                  <p className="shopping-product-price">{product.size}</p>

                  <div className="quantity-remove">
                    <div className="shopping-quantity">
                      <button
                        type="button"
                        aria-label={`Decrease ${product.name} quantity`}
                        disabled={product.quantity <= 1}
                        onClick={() =>
                          updateQuantity(product.id, product.quantity - 1)
                        }
                      >
                        <Minus size={17} aria-hidden="true" />
                      </button>

                      <span aria-live="polite">{product.quantity}</span>

                      <button
                        type="button"
                        aria-label={`Increase ${product.name} quantity`}
                        disabled={product.quantity >= product.stockQuantity}
                        onClick={() =>
                          updateQuantity(product.id, product.quantity + 1)
                        }
                      >
                        <Plus size={17} aria-hidden="true" />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="shopping-remove"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="shopping-product-total">
                  {formatCurrency(product.price * product.quantity)}
                </div>
              </article>
            ))}
          </div>

          <aside className="order-summary" aria-labelledby="order-summary-title">
            <h2 id="order-summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>{delivery === 0 ? "Complimentary" : formatCurrency(delivery)}</span>
            </div>

            <p className="delivery-progress" aria-live="polite">
              {amountUntilFreeDelivery > 0
                ? `Add ${formatCurrency(amountUntilFreeDelivery)} for complimentary delivery.`
                : "Complimentary delivery unlocked."}
            </p>

            <div className="summary-total">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <button type="button" className="checkout-btn">
              Proceed to Checkout
            </button>

            <Link to="/shop" className="continue-shopping">
              Continue Shopping
            </Link>

            <p className="checkout-description">
              Shipping and taxes will be calculated during checkout.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Cart;
