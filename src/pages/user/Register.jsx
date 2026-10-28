import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterImage from "../../assets/register-1.jpg";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

   
    localStorage.setItem("cc_user", JSON.stringify(form));

    navigate("/");
  };

  return (
    <main className="register">
    
      <div className="register-image">
        <img src={RegisterImage} alt="Makeup products on a vanity" />
      </div>

      <section className="register-panel">
        <div className="register-box">
          <p className="register-logo">
            Cherry <span>Cheeks</span>
          </p>
          <p className="register-eyebrow">Create your account</p>
          <h1 className="register-title">Join Cherry Cheeks</h1>
          <p className="register-sub">
            Create a demo account to save your bag and view orders.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={handleChange} />
            <label htmlFor="email">Email address</label>
            <input id="email" name="email"type="email" autoComplete="email"value={form.email}
              onChange={handleChange} />

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={handleChange}
            />
            {error && <p className="register-error">{error}</p>}

            <button type="submit" className="register-btn">
              Create account
            </button>
          </form>

          <p className="register-note">
            Bag saved in this browser · Faster checkout · Order history
          </p>

          <p className="register-signin">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;