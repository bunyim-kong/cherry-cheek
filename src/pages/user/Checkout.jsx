import {
  ArrowLeft,
  CreditCard,
  LocateFixed,
  LockKeyhole,
  MapPin,
  QrCode,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import "./Checkout.css";

const FREE_DELIVERY_THRESHOLD = 80;
const STANDARD_DELIVERY_FEE = 6;
const REVERSE_GEOCODING_URL = "https://nominatim.openstreetmap.org/reverse";

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function isValidExpiry(value) {
  const match = value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
  if (!match) return false;

  const expiryMonth = Number(match[1]);
  const expiryYear = 2000 + Number(match[2]);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  return (
    expiryYear > currentYear ||
    (expiryYear === currentYear && expiryMonth >= currentMonth)
  );
}

function buildMapPreviewUrl({ latitude, longitude }) {
  const latitudeDelta = 0.004;
  const longitudeDelta = 0.006;
  const bounds = [
    longitude - longitudeDelta,
    latitude - latitudeDelta,
    longitude + longitudeDelta,
    latitude + latitudeDelta,
  ].join(",");
  const params = new URLSearchParams({
    bbox: bounds,
    layer: "mapnik",
    marker: `${latitude},${longitude}`,
  });

  return `https://www.openstreetmap.org/export/embed.html?${params}`;
}

function validateField(name, value, form) {
  const trimmedValue = value.trim();

  if (name === "name" && !trimmedValue) return "Enter the recipient name.";
  if (name === "phone" && value.replace(/\D/g, "").length < 8) {
    return "Enter a valid phone number.";
  }
  if (name === "address" && !trimmedValue) return "Enter a delivery address.";
  if (name === "city" && !trimmedValue) return "Enter a city or province.";

  if (form.paymentMethod === "card") {
    if (name === "cardName" && !trimmedValue) return "Enter the name on the card.";
    if (name === "cardNumber" && value.replace(/\D/g, "").length !== 16) {
      return "Enter a 16-digit card number.";
    }
    if (name === "cardExpiry" && !isValidExpiry(value)) {
      return "Enter a valid future date in MM/YY format.";
    }
    if (name === "cardCvc" && !/^\d{3,4}$/.test(value)) {
      return "Enter the 3 or 4-digit security code.";
    }
  }

  return "";
}

function FieldError({ field, errors }) {
  if (!errors[field]) return null;

  return (
    <span className="checkout-field-error" id={`${field}-error`}>
      {errors[field]}
    </span>
  );
}

export default function Checkout() {
  const { user } = useAuth();
  const { cartItems, subtotal, placeOrder } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const errorSummaryRef = useRef(null);
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false);
  const [errors, setErrors] = useState({});
  const [mapLocation, setMapLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [form, setForm] = useState(() => ({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "card",
    cardName: user?.name || "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  }));

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          authMessage: "Sign in to continue to checkout.",
        }}
      />
    );
  }

  if (cartItems.length === 0 && !hasPlacedOrder) {
    return <Navigate to="/cart" replace />;
  }

  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  const total = subtotal + delivery;

  function handleChange(event) {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === "cardNumber") {
      nextValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    } else if (name === "cardExpiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      nextValue = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    } else if (name === "cardCvc") {
      nextValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setForm((currentForm) => ({ ...currentForm, [name]: nextValue }));
    setErrors((currentErrors) => {
      if (!currentErrors[name]) return currentErrors;
      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    const message = validateField(name, value, form);

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      if (message) nextErrors[name] = message;
      else delete nextErrors[name];
      return nextErrors;
    });
  }

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not available in this browser. Enter the address manually.");
      return;
    }

    setIsLocating(true);
    setLocationStatus("Finding your location…");

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const nextLocation = {
          latitude: Number(coords.latitude.toFixed(6)),
          longitude: Number(coords.longitude.toFixed(6)),
          country: "",
          lookupComplete: false,
        };

        const isCachedLocation =
          mapLocation?.lookupComplete &&
          Math.abs(mapLocation.latitude - nextLocation.latitude) < 0.0001 &&
          Math.abs(mapLocation.longitude - nextLocation.longitude) < 0.0001;

        if (isCachedLocation) {
          setLocationStatus("Location is already up to date.");
          setIsLocating(false);
          return;
        }

        setMapLocation(nextLocation);
        setLocationStatus("Location found. Looking up the address…");

        try {
          const params = new URLSearchParams({
            format: "jsonv2",
            lat: String(nextLocation.latitude),
            lon: String(nextLocation.longitude),
            addressdetails: "1",
            layer: "address",
          });
          const response = await fetch(`${REVERSE_GEOCODING_URL}?${params}`);
          if (!response.ok) throw new Error("Address lookup failed");

          const result = await response.json();
          const address = result.address || {};
          const addressLine = [
            address.house_number,
            address.road,
            address.neighbourhood || address.suburb || address.district,
          ]
            .filter(Boolean)
            .join(", ");
          const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            address.state ||
            "";

          setMapLocation({
            ...nextLocation,
            country: address.country || "",
            lookupComplete: true,
          });
          setForm((currentForm) => ({
            ...currentForm,
            address: addressLine || currentForm.address,
            city: city || currentForm.city,
          }));
          setErrors((currentErrors) => {
            const nextErrors = { ...currentErrors };
            if (addressLine) delete nextErrors.address;
            if (city) delete nextErrors.city;
            return nextErrors;
          });
          setLocationStatus(
            addressLine || city
              ? "Location added and address fields updated."
              : "Location added. Please complete the address fields.",
          );
        } catch {
          setMapLocation({ ...nextLocation, lookupComplete: true });
          setLocationStatus("Location added. Please complete the address fields manually.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? "Location access was not allowed. You can still enter the address manually."
            : "We could not find your location. Check your connection and try again.";
        setLocationStatus(message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    );
  }

  function handleRemoveLocation() {
    setMapLocation(null);
    setLocationStatus("Map location removed. Your typed address is unchanged.");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fields = ["name", "phone", "address", "city"];
    if (form.paymentMethod === "card") {
      fields.push("cardName", "cardNumber", "cardExpiry", "cardCvc");
    }

    const nextErrors = fields.reduce((fieldErrors, field) => {
      const message = validateField(field, form[field], form);
      if (message) fieldErrors[field] = message;
      return fieldErrors;
    }, {});

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setHasPlacedOrder(true);
    const order = placeOrder({
      shippingAddress: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        country: mapLocation?.country || "",
        coordinates: mapLocation
          ? {
              latitude: mapLocation.latitude,
              longitude: mapLocation.longitude,
            }
          : null,
      },
      paymentMethod: form.paymentMethod,
    });

    if (order) {
      navigate(`/profile?order=success&id=${encodeURIComponent(order.id)}`, {
        replace: true,
      });
    }
  }

  const errorEntries = Object.entries(errors);

  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <div className="checkout-header__inner">
          <Link className="checkout-back" to="/cart">
            <ArrowLeft aria-hidden="true" />
            <span>Back to bag</span>
          </Link>
          <Link className="checkout-logo" to="/">
            Cherry <span>Cheek</span>
          </Link>
          <span className="checkout-secure">
            <LockKeyhole aria-hidden="true" />
            Checkout
          </span>
        </div>
      </header>

      <div className="checkout-layout">
        <aside className="checkout-summary" aria-labelledby="checkout-summary-title">
          <div className="checkout-summary__heading">
            <div>
              <p className="checkout-kicker">Your selection</p>
              <h2 id="checkout-summary-title">Order summary</h2>
            </div>
            <span>{cartItems.length} {cartItems.length === 1 ? "item" : "items"}</span>
          </div>

          <div className="checkout-items">
            {cartItems.map((item) => (
              <article className="checkout-item" key={item.id}>
                <span className="checkout-item__image">
                  <img src={item.image} alt="" width="64" height="72" />
                  <small aria-label={`Quantity ${item.quantity}`}>{item.quantity}</small>
                </span>
                <span className="checkout-item__details">
                  <strong>{item.name}</strong>
                  <small>{item.size}</small>
                </span>
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
              </article>
            ))}
          </div>

          <dl className="checkout-totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatCurrency(subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>{delivery === 0 ? "Complimentary" : formatCurrency(delivery)}</dd>
            </div>
            <div className="checkout-totals__grand">
              <dt>Total</dt>
              <dd>{formatCurrency(total)}</dd>
            </div>
          </dl>
        </aside>

        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="checkout-intro">
            <p className="checkout-kicker">Checkout</p>
            <h1>Complete your order</h1>
            <p>Enter your delivery details and choose a payment method.</p>
          </div>

          {errorEntries.length > 0 && (
            <div
              className="checkout-error-summary"
              ref={errorSummaryRef}
              role="alert"
              tabIndex="-1"
              aria-labelledby="checkout-error-title"
            >
              <strong id="checkout-error-title">Please check your details</strong>
              <ul>
                {errorEntries.map(([field, message]) => (
                  <li key={field}>
                    <a href={`#${field}`}>{message}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <section className="checkout-section" aria-labelledby="delivery-heading">
            <div className="checkout-section__heading">
              <span>1</span>
              <div>
                <p className="checkout-kicker">Delivery</p>
                <h2 id="delivery-heading">Where should we send it?</h2>
              </div>
            </div>

            <div className="checkout-fields">
              <label className="checkout-field checkout-field--full" htmlFor="name">
                Recipient name
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                <FieldError field="name" errors={errors} />
              </label>

              <label className="checkout-field" htmlFor="phone">
                Phone number
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="tel"
                  placeholder="e.g. 012 345 678"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                <FieldError field="phone" errors={errors} />
              </label>

              <label className="checkout-field" htmlFor="city">
                City or province
                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="address-level2"
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? "city-error" : undefined}
                />
                <FieldError field="city" errors={errors} />
              </label>

              <label className="checkout-field checkout-field--full" htmlFor="address">
                Delivery address
                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="street-address"
                  placeholder="House number, street, district"
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={errors.address ? "address-error" : undefined}
                />
                <FieldError field="address" errors={errors} />
              </label>

              <div className="checkout-location checkout-field--full">
                <div className="checkout-location__heading">
                  <span className="checkout-location__icon" aria-hidden="true">
                    <MapPin />
                  </span>
                  <div>
                    <strong>Add a map location</strong>
                    <small>Optional · helps confirm the delivery point</small>
                  </div>
                  <button
                    type="button"
                    onClick={handleUseLocation}
                    disabled={isLocating}
                    aria-busy={isLocating}
                  >
                    <LocateFixed aria-hidden="true" />
                    {isLocating ? "Locating…" : mapLocation ? "Update location" : "Use my location"}
                  </button>
                </div>

                {mapLocation && (
                  <div className="checkout-location__map">
                    <iframe
                      title="Selected delivery location"
                      src={buildMapPreviewUrl(mapLocation)}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                    <div className="checkout-location__map-footer">
                      <a
                        href={`https://www.openstreetmap.org/?mlat=${mapLocation.latitude}&mlon=${mapLocation.longitude}#map=17/${mapLocation.latitude}/${mapLocation.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View larger map
                      </a>
                      <button type="button" onClick={handleRemoveLocation}>
                        Remove map pin
                      </button>
                    </div>
                  </div>
                )}

                <p className="checkout-location__status" aria-live="polite">
                  {locationStatus || "Location access is requested only when you choose this option."}
                </p>
                <a
                  className="checkout-location__credit"
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noreferrer"
                >
                  Map data © OpenStreetMap contributors
                </a>
              </div>
            </div>
          </section>

          <section className="checkout-section" aria-labelledby="payment-heading">
            <div className="checkout-section__heading">
              <span>2</span>
              <div>
                <p className="checkout-kicker">Payment</p>
                <h2 id="payment-heading">How would you like to pay?</h2>
              </div>
            </div>

            <div className="checkout-payment-options">
              <label className={form.paymentMethod === "card" ? "is-selected" : ""}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={form.paymentMethod === "card"}
                  onChange={handleChange}
                />
                <CreditCard aria-hidden="true" />
                <span>
                  <strong>Credit or debit card</strong>
                </span>
              </label>
              <label className={form.paymentMethod === "qr" ? "is-selected" : ""}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="qr"
                  checked={form.paymentMethod === "qr"}
                  onChange={handleChange}
                />
                <QrCode aria-hidden="true" />
                <span>
                  <strong>QR payment</strong>
                </span>
              </label>
            </div>

            {form.paymentMethod === "card" ? (
              <div className="checkout-fields checkout-card-fields">
                <label className="checkout-field checkout-field--full" htmlFor="cardName">
                  Name on card
                  <input
                    id="cardName"
                    name="cardName"
                    value={form.cardName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="cc-name"
                    aria-invalid={Boolean(errors.cardName)}
                    aria-describedby={errors.cardName ? "cardName-error" : undefined}
                  />
                  <FieldError field="cardName" errors={errors} />
                </label>

                <label className="checkout-field checkout-field--full" htmlFor="cardNumber">
                  Card number
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    inputMode="numeric"
                    value={form.cardNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="cc-number"
                    placeholder="4242 4242 4242 4242"
                    aria-invalid={Boolean(errors.cardNumber)}
                    aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
                  />
                  <FieldError field="cardNumber" errors={errors} />
                </label>

                <label className="checkout-field" htmlFor="cardExpiry">
                  Expiry date
                  <input
                    id="cardExpiry"
                    name="cardExpiry"
                    inputMode="numeric"
                    value={form.cardExpiry}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    aria-invalid={Boolean(errors.cardExpiry)}
                    aria-describedby={errors.cardExpiry ? "cardExpiry-error" : undefined}
                  />
                  <FieldError field="cardExpiry" errors={errors} />
                </label>

                <label className="checkout-field" htmlFor="cardCvc">
                  Security code
                  <input
                    id="cardCvc"
                    name="cardCvc"
                    type="password"
                    inputMode="numeric"
                    value={form.cardCvc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="cc-csc"
                    placeholder="CVC"
                    aria-invalid={Boolean(errors.cardCvc)}
                    aria-describedby={errors.cardCvc ? "cardCvc-error" : undefined}
                  />
                  <FieldError field="cardCvc" errors={errors} />
                </label>
              </div>
            ) : null}
          </section>

          <button className="checkout-submit" type="submit">
            <LockKeyhole aria-hidden="true" />
            Place order · {formatCurrency(total)}
          </button>
        </form>
      </div>
    </main>
  );
}
