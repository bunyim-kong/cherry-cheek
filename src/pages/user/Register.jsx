import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import RegisterImage from "../../assets/register-1.jpg";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

   
    register({ name: form.name, email: form.email });
    navigate("/account");
  };

  return (
    <main className="auth-page">
      <div className="auth-visual">
        <img src={RegisterImage} alt="Makeup products on a vanity" />
      </div>

      <section className="auth-panel">
        <div className="auth-box">
          <Link className="auth-logo" to="/">
            Cherry <span>Cheeks</span>
          </Link>
          <p className="auth-eyebrow">Create your account</p>
          <h1 className="auth-title">Join Cherry Cheeks</h1>
          <p className="auth-description">
            Create a demo account to save your bag and view orders.
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="register-name">Full name</label>
            <input
              id="register-name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="Example@gmail.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              minLength="6"
              required
            />

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-submit">
              Create account
            </button>
          </form>

          <p className="auth-note">
            Bag saved in this browser · Faster checkout · Order history
          </p>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
