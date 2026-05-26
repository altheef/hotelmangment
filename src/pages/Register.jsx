import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  loginUser,
  registerUser,
} from "../redux/slices/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(
    (state) => state.authReducer.users
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const { name, email, password, confirmPassword } =
      formData;

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Missing details",
        text: "Fill all registration fields.",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak password",
        text: "Password must be at least 6 characters.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password mismatch",
        text: "Confirm password should match password.",
      });
      return;
    }

    const alreadyExists = users.some(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      Swal.fire({
        icon: "error",
        title: "Email already registered",
        text: "Use a different email or login.",
      });
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "Manager",
    };

    dispatch(registerUser(newUser));
    dispatch(loginUser(newUser));

    Swal.fire({
      icon: "success",
      title: "Registration successful",
      text: "Your account is now active.",
      timer: 1200,
      showConfirmButton: false,
    });

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-backdrop"></div>

      <div className="auth-card">
        <h2>Create Hotel Account</h2>
        <p>Register to unlock all HMS modules.</p>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={onInputChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={onInputChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={onInputChange}
              placeholder="At least 6 characters"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={onInputChange}
              placeholder="Re-enter password"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success btn-lg">
              Register
            </button>
          </div>
        </form>

        <p className="mt-3 mb-0 text-center">
          Already have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
