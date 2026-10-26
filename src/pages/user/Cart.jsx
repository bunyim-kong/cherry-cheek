import "../../styles/main.css";
import "./Cart.css";

function Cart() {
  return (
    <main>
      {/* When does not have stage from ordering yet */}
      <section className="container-shopping">
        <div className="shopping-content">
          <p className="shopping-subtitle">your bag</p>
          <h1 className="shopping-title">Sign in to view your bag</h1>
          <p className="shopping-description">
            Sign in to open the shopping bag saved for this account in this
            browser.
          </p>
          <button className="shopping-btn">
            <a href="login">Sign in or register</a>
          </button>
          <a className="link-shopping" href="shop">
            Continue Shopping
          </a>
        </div>
      </section>

      {/* When stage from ordering it will appear*/}
      <section className="contianer-shopping-bag">
        <div className="">
          <p>YOUR SELECTION</p>
          <h1>Shopping bag</h1>
        </div>

        <div className="container-product-order">
          <div className="product-detail">
              
          </div>
          <div className="order-summury">

          </div>
        </div>
      </section>
    </main>
  );
}
export default Cart;
