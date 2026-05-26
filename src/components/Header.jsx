import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  FaBed,
  FaCalendarCheck,
  FaHotel,
  FaUserCircle,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import { logoutUser } from "../redux/slices/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state) => state.authReducer.currentUser
  );

  const handleLogout = () => {
    Swal.fire({
      title: "Logout now?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      dispatch(logoutUser());
      navigate("/login");
    });
  };

  const getNavClass = ({ isActive }) =>
    `nav-link-custom ${isActive ? "active" : ""}`;

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="topbar shadow-sm"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand-logo">
          <FaHotel className="me-2" />
          Hotel HMS Pro
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <NavLink to="/dashboard" className={getNavClass}>
              Dashboard
            </NavLink>

            <NavLink to="/rooms" className={getNavClass}>
              <FaBed className="me-1" /> Rooms
            </NavLink>

            <NavLink to="/bookings" className={getNavClass}>
              <FaCalendarCheck className="me-1" /> Bookings
            </NavLink>

            <NavLink to="/customers" className={getNavClass}>
              <FaUsers className="me-1" /> Customers
            </NavLink>

            <NavLink to="/staff" className={getNavClass}>
              <FaUserTie className="me-1" /> Staff
            </NavLink>

            <NavLink to="/profile" className={getNavClass}>
              <FaUserCircle className="me-1" /> Profile
            </NavLink>

            {currentUser ? (
              <>
                <span className="user-pill mt-2 mt-lg-0">
                  {currentUser.name}
                </span>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-light ms-lg-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={getNavClass}>
                  Login
                </NavLink>

                <NavLink to="/register" className={getNavClass}>
                  Register
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
