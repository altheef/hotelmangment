import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-shell">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <h3 className="fw-bold">Hotel HMS Pro</h3>
            <p className="mb-2">
              Smart hotel operations platform for rooms,
              bookings, customers and staffing.
            </p>
            <p className="mb-0 text-light-emphasis">
              Built with React + Redux Toolkit.
            </p>
          </div>

          <div className="col-lg-2 col-md-4">
            <h5>Links</h5>
            <Link to="/" className="footer-link d-block">
              Home
            </Link>
            <Link to="/dashboard" className="footer-link d-block">
              Dashboard
            </Link>
            <Link to="/rooms" className="footer-link d-block">
              Rooms
            </Link>
            <Link to="/bookings" className="footer-link d-block">
              Bookings
            </Link>
          </div>

          <div className="col-lg-3 col-md-4">
            <h5>Contact</h5>
            <p className="mb-1">Email: hotel@gmail.com</p>
            <p className="mb-1">Phone: +91 9876543210</p>
            <p className="mb-0">Address: Kochi, Kerala</p>
          </div>

          <div className="col-lg-3 col-md-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 fs-4 mt-2">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
              <FaWhatsapp />
              <FaPhone />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
