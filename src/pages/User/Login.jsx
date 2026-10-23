import loginImage from "../../assets/images/login.jpg";
import "../../styles/main.css";
import "./Login.css";
// import ButtonLogin from "../../components/ButtonLogin";


function Login() {
  return (
    <section className="container">
      <div className="content_login">
        <div className="left-product_Image">
          <img src={loginImage} alt="Login" className="login-product__image" />
        </div>


        <div className="right-form_content">
          <h2>
            <span>Cherry</span>   Cheeks
          </h2>
          <p className="login-welcome">WELCOME BACK</p>


          <h1>Sign in to your account</h1>
          <p className="login-description">
            Use any valid email and password for this learning demo.{" "}
          </p>


          <div className="form">
            <form>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="dara@gmail.com"
              />


              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />


              {/* 2. Call your Button component here */}
              {/* <ButtonLogin type="submit">Sign In</ButtonLogin> */}
            </form>
          </div>


          <p className="login-benefits">
            Bag saved in this browser · Faster checkout · Order history
          </p>


          <p className="login-register">
            New to Cherry Cheeks?{" "}
            <span>
              <a href="/register">Create an account</a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}


export default Login;
