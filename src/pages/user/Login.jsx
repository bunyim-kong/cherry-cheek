import loginImage from "../../assets/images/login.jpg";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "./Auth.css";

function getReturnPath(locationState) {
  const from = locationState?.from;

  if (!from?.pathname?.startsWith("/") || from.pathname.startsWith("//")) {
    return "/";
  }

  return `${from.pathname}${from.search || ""}${from.hash || ""}`;
}

function Login() {
  const { user, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const returnPath = getReturnPath(location.state);

  if (user) {
    return <Navigate to={user.role === "ADMIN" ? "/admin/dashboard" : returnPath} replace />;
  }

  function handleChange(event) {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.email.trim() || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      const signedInUser = await login({ email: form.email });
      navigate(
        signedInUser.role === "ADMIN" ? "/admin/dashboard" : returnPath,
        { replace: true },
      );
    } catch (loginError) {
      setError(loginError.message || "Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            Use an email and password for this learning demo. Passwords are not checked.
          </p>

          {location.state?.authMessage && (
            <p className="auth-message" role="status">
              {location.state.authMessage}
            </p>
          )}

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

            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="auth-note">
            Bag saved in this browser · Faster checkout · Order history
          </p>

          <p className="auth-switch">
            New to Cherry Cheeks?{" "}
            <Link to="/register" state={location.state}>
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}


export default Login;
