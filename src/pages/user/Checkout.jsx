import { useState } from "react";

// Product Images
import cleanserImage from "../../assets/images/dew-reset-cleanser.jpg";
import tonerImage from "../../assets/images/cloud-milk-toner-gallery-2.jpg";

// CSS
import "../../styles/main.css";
import "./Checkout.css";

// Demo Products
const products = [
  {
    id: 1,
    name: "Dew Reset Cleanser",
    price: 24.0,
    image: cleanserImage,
  },
  {
    id: 2,
    name: "Cloud Milk Toner",
    price: 25.0,
    image: tonerImage,
  },
];

function Checkout() {
  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Calculate Subtotal
  const subtotal = products.reduce(
    (total, product) => total + product.price,
    0
  );

  // Delivery Fee
  const delivery = 8.0;

  // Total Price
  const total = subtotal + delivery;

  // Handle Order
  function handleOrder(event) {
    event.preventDefault();

    alert("Your demo order has been placed successfully!");
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* LEFT SIDE: CHECKOUT FORM */}
        <div className="checkout-left">
          <form onSubmit={handleOrder}>

            {/* DELIVERY SECTION */}
            <section className="checkout-delivery">

              <p className="checkout-step">1 · DELIVERY</p>

              <h1 className="checkout-title">
                Where should we send your order?
              </h1>

              <div className="checkout-form">

                {/* Recipient Name */}
                <div className="checkout-field">
                  <label htmlFor="recipient">
                    Recipient name
                  </label>

                  <input
                    type="text"
                    id="recipient"
                    name="recipient"
                    required
                  />
                </div>

                {/* Phone and Country */}
                <div className="checkout-field-row">

                  <div className="checkout-field">
                    <label htmlFor="phone">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="country">
                      Country or region
                    </label>

                    <input
                      type="text"
                      id="country"
                      name="country"
                      defaultValue="Cambodia"
                      required
                    />
                  </div>

                </div>

                {/* Delivery Address */}
                <div className="checkout-field">
                  <label htmlFor="address">
                    Delivery address
                  </label>

                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                  />
                </div>

                {/* Address Link */}
                <div className="checkout-field">
                  <label htmlFor="addressLink">
                    Address Link
                  </label>

                  <input
                    type="url"
                    id="addressLink"
                    name="addressLink"
                  />
                </div>

              </div>
            </section>

            {/* PAYMENT SECTION */}
            <section className="checkout-payment">

              <p className="checkout-step">2 · PAYMENT</p>

              <h2 className="checkout-title">
                Choose a payment method
              </h2>

              <div className="checkout-payment-options">

                {/* Card Payment */}
                <div
                  className={`checkout-payment-card ${
                    paymentMethod === "card" ? "active" : ""
                  }`}
                >
                  <label
                    className="checkout-payment-heading"
                    htmlFor="card"
                  >
                    <input
                      type="radio"
                      id="card"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />

                    <span>Card payment</span>
                  </label>

                  <p>
                    Demo only — no card details are collected.
                  </p>
                </div>

                {/* QR Payment */}
                <div
                  className={`checkout-payment-card ${
                    paymentMethod === "qr" ? "active" : ""
                  }`}
                >
                  <label
                    className="checkout-payment-heading"
                    htmlFor="qr"
                  >
                    <input
                      type="radio"
                      id="qr"
                      name="payment"
                      value="qr"
                      checked={paymentMethod === "qr"}
                      onChange={() => setPaymentMethod("qr")}
                    />

                    <span>QR payment</span>
                  </label>

                  <p>Mock local payment option.</p>
                </div>

              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="checkout-order-btn"
              >
                Place demo order · ${total.toFixed(2)}
              </button>

            </section>

          </form>
        </div>

        {/* RIGHT SIDE: ORDER SUMMARY */}
        <aside className="checkout-right">

          <div className="checkout-summary">

            <h2>Your order</h2>

            {/* Product List */}
            <div className="checkout-products">

              {products.map((product) => (
                <div
                  className="checkout-product"
                  key={product.id}
                >

                  {/* Product Image */}
                  <div className="checkout-product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  {/* Product Information */}
                  <div className="checkout-product-info">
                    <h3>{product.name}</h3>

                    <p>${product.price.toFixed(2)}</p>
                  </div>

                </div>
              ))}

            </div>

            {/* Order Price */}
            <div className="checkout-price-details">

              <div className="checkout-price-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="checkout-price-row">
                <span>Delivery</span>
                <span>${delivery.toFixed(2)}</span>
              </div>

              <div className="checkout-price-row checkout-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

            </div>

          </div>

        </aside>

      </div>
    </div>
  );
}

export default Checkout;