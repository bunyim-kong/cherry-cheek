import { Link } from "react-router-dom";
import "./Cart.css";
import "../../styles/main.css";

function Cart() {
  // Temporary conditions for testing UI
  const isLoggedIn = true;
  const hasProducts = true;
  // condition 1: User has NOT signed in
  if (!isLoggedIn) {
    return (
      <main>
        <section className="container-shopping">
          <div className="shopping-content">
            <p className="shopping-subtitle">YOUR BAG</p>

            <h1 className="shopping-title">Sign in to view your bag</h1>

            <p className="shopping-description">
              Sign in to open the shopping bag saved for this account in this
              browser.
            </p>

            <Link to="/login" className="shopping-btn">
              Sign in or register
            </Link>

            <Link to="/shop" className="link-shopping">
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // condition 2: User signed in but cart is EMPTY
  if (!hasProducts) {
    return (
      <main>
        <section className="container-shopping">
          <div className="shopping-content">
            <p className="shopping-subtitle">YOUR BAG</p>

            <h1 className="shopping-title">It's quiet in here</h1>

            <p className="shopping-description">
              Explore our edit and choose the next step in your routine.
            </p>

            <Link to="/shop" className="shopping-btn">
              Shop skincare
            </Link>

            <Link to="/shop" className="link-shopping">
              Continue shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // consdition 3: User signed in and HAS PRODUCTS
  return (
    <main>
      <section className="container shopping-container">
        {/* Shopping Header */}
        <div className="shopping-bag-header">
          <p className="shopping-subtitle">YOUR SELECTION</p>

          <h1 className="shopping-bag-title">Shopping bag</h1>
        </div>

        <div className="container-product-order">
          <div className="product-state">
            <article className="shopping-product">
              <div className="shopping-product-image">
                <img src="/images/product-1.jpg" alt="Skincare Product" />
              </div>

              <div className="shopping-product-info">
                <p className="shopping-product-brand">Cherry Cheeks</p>

                <h3 className="shopping-product-name">Cloud Milk Toner</h3>

                <p className="shopping-product-price">150ml</p>

                {/* Quantity UI Only */}
                <div className="quantity-remove">
                  <div className="shopping-quantity">
                    <button type="button">−</button>

                    <span>1</span>

                    <button type="button">+</button>
                  </div>

                </div>
              </div>

              {/* Product Total */}
              <div className="shopping-product-total">$25.00</div>
            </article>
            
          </div>


          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span> $63.00</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span> $6.00</span>
            </div>

            <div className="summary-row">
              <span>Add $31.00 for complimentary delivery.</span>
            </div>

            <div className="summary-total">
              <span>total</span>
              <span> $57.00</span>
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
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cart;
