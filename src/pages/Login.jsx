import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { loginUser } from "../redux/slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const users = useSelector(
    (state) => state.authReducer.users
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing details",
        text: "Enter both email and password.",
      });
      return;
    }

    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() ===
          formData.email.toLowerCase() &&
        user.password === formData.password
    );

    if (!matchedUser) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Invalid credentials.",
      });
      return;
    }

    dispatch(loginUser(matchedUser));

    Swal.fire({
      icon: "success",
      title: "Welcome back",
      text: `${matchedUser.name} logged in successfully.`,
      timer: 1200,
      showConfirmButton: false,
    });

    const redirectTo = location.state?.from || "/dashboard";
    navigate(redirectTo);
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: "admin@hotel.com",
      password: "admin123",
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-backdrop"></div>

      <div className="auth-card">
        <h2>Hotel HMS Login</h2>
        <p>Sign in to manage rooms, bookings and staff.</p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={onInputChange}
              placeholder="admin@hotel.com"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              value={formData.password}
              onChange={onInputChange}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="button"
            className="btn btn-link px-0"
            onClick={() =>
              setShowPassword((prevState) => !prevState)
            }
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary btn-lg">
              Login
            </button>

            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={fillDemoCredentials}
            >
              Use Demo Login
            </button>
          </div>
        </form>

        <p className="mt-3 mb-0 text-center">
          New user? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
