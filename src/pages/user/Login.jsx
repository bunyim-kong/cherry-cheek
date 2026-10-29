import loginImage from "../../assets/images/login.jpg";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "./Auth.css";

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/account" replace />;
  }

  function handleChange(event) {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.email.trim() || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    login({ email: form.email });
    navigate("/account");
  }

  return (
    <main className="auth-page">
      <div className="auth-visual">
        <img src={loginImage} alt="Cherry Cheeks skincare products" />
      </div>

      <section className="auth-panel">
        <div className="auth-box">
          <Link className="auth-logo" to="/">
            Cherry <span>Cheeks</span>
          </Link>
          <p className="auth-eyebrow">Welcome back</p>
          <h1 className="auth-title">Sign in to your account</h1>
          <p className="auth-description">
            Use any valid email and password for this learning demo.
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="login-email">Email address</label>
            <input
              type="email"
              name="email"
              id="login-email"
              placeholder="Example@gmail.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              name="password"
              id="login-password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              minLength="6"
              required
            />

            {error && <p className="auth-error">{error}</p>}

            <button className="auth-submit" type="submit">
              Sign in
            </button>
          </form>

          <p className="auth-note">
            Bag saved in this browser · Faster checkout · Order history
          </p>

          <p className="auth-switch">
            New to Cherry Cheeks? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}


export default Login;
