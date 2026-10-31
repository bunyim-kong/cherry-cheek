import { useState } from "react";
import { Clock3, Mail } from "lucide-react";
import "./Contact.css";

const contactDetails = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@cherrycheeks.com",
    href: "mailto:hello@cherrycheeks.com",
  },
  {
    icon: Clock3,
    label: "Response time",
    value: "Within 1–2 business days",
  },
];

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <div className="contact-page">
      <section className="contact-hero container">
        <div>
          <p className="contact-eyebrow">Contact Cherry Cheeks</p>
          <h1>Let&apos;s talk about your routine.</h1>
        </div>
        <p className="contact-hero__intro">
          Need product guidance, help with an order, or simply want to say
          hello? Send us a note and our care team will be in touch.
        </p>
      </section>

      <section className="contact-content container" aria-labelledby="contact-form-title">
        <div className="contact-aside">
          <div className="contact-aside__icon" aria-hidden="true">
          </div>
          <p className="contact-eyebrow">We&apos;re here to help</p>
          <h2>Thoughtful answers, without the guesswork.</h2>
          <p>
            Tell us what you need and include your order number when your
            question is about an existing purchase.
          </p>

          <div className="contact-details">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <div className="contact-detail" key={label}>
                <Icon size={20} aria-hidden="true" />
                <div>
                  <span>{label}</span>
                  {href ? <a href={href}>{value}</a> : <strong>{value}</strong>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-form-panel">
          <p className="contact-eyebrow">Send a message</p>
          <h2 id="contact-form-title">How can we help?</h2>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <div className="contact-field">
                <label htmlFor="contact-name">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-field">
                <label htmlFor="contact-topic">
                  Topic <span aria-hidden="true">*</span>
                </label>
                <select id="contact-topic" name="topic" defaultValue="" required>
                  <option value="" disabled>
                    Choose a topic
                  </option>
                  <option value="product">Product guidance</option>
                  <option value="order">Order support</option>
                  <option value="returns">Shipping and returns</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-order">Order number</label>
                <input
                  id="contact-order"
                  name="orderNumber"
                  type="text"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="6"
                placeholder="Tell us how we can help"
                required
              />
            </div>

            <div className="contact-form__footer">
              <button type="submit">Send message</button>
              <p className="contact-required">* Required fields</p>
            </div>

            {submitted && (
              <p className="contact-success" role="status">
                Thanks for your message. We&apos;ll be in touch soon.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
