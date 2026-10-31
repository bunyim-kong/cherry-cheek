
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Top area: brand + 3 columns */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <h2 className="footer-logo">
              Cherry <span className="footer-logo-accent">Cheeks</span>
            </h2>
            <p className="footer-tagline">
              Thoughtful skincare selected for simple, consistent routines.
            </p>
          </div>

          {/* Shop links */}
          <nav className="footer-col" aria-label="Shop">
            <h3 className="footer-heading">Shop</h3>
            <ul className="footer-list">
              <li><a href="/shop">All products</a></li>
              <li><a href="/category">Category</a></li>
            </ul>
          </nav>

          {/* Help links */}
          <nav className="footer-col" aria-label="Help">
            <h3 className="footer-heading">Help</h3>
            <ul className="footer-list">
              <li><a href="/our-story">Our story</a></li>
              <li><a href="">Shipping and returns</a></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          {/* Newsletter + socials */}
          <div className="footer-col footer-newsletter">
            <h3 className="footer-heading">Stay close</h3>
            <p className="footer-text">
              Routine notes, new formulas and useful skincare guidance.
            </p>

            <form className="footer-form" onSubmit={handleSubmit}>
              <label htmlFor="footer-email" className="footer-label">
                Email address
              </label>
              <input
                id="footer-email"
                className="footer-input"
                type="email"
                placeholder="Email address"
              />
            </form>

            {/* Social icons (inline SVG, no extra library needed) */}
            <div className="footer-socials">
              {/* Facebook */}
              <a href="" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* X (Twitter) */}
              <a href="" aria-label="X">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© 2026 Cherry Cheeks</span>
          <span className="footer-dot">·</span>
          <a href="">Privacy</a>
          <span className="footer-dot">·</span>
          <a href="">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
