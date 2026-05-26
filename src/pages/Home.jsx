import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBed,
  FaCalendarCheck,
  FaChartLine,
  FaUserTie,
} from "react-icons/fa";
import Header from "../components/Header";

function Home() {
  const currentUser = useSelector(
    (state) => state.authReducer.currentUser
  );

  return (
    <>
      <Header />

      <section className="hero-section">
        <div className="hero-glow"></div>

        <div className="container page-shell">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <span className="hero-badge">Hotel Operations Suite</span>

              <h1 className="hero-title mt-3">
                Manage Every Hotel Workflow From One Dashboard
              </h1>

              <p className="hero-subtitle mt-3">
                Control inventory, booking lifecycle, guest records,
                staffing and profile settings with a faster and
                cleaner experience.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                {currentUser ? (
                  <Link to="/dashboard" className="btn btn-lg btn-light">
                    Open Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-lg btn-light">
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="btn btn-lg btn-outline-light"
                    >
                      Register
                    </Link>
                  </>
                )}

                <Link
                  to="/rooms"
                  className="btn btn-lg btn-outline-light"
                >
                  Explore Rooms
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="hero-card">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                  alt="Hotel"
                  className="img-fluid rounded-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-3">
            <div className="feature-card h-100">
              <FaBed className="feature-icon" />
              <h5>Room Inventory</h5>
              <p>Track 20+ rooms with status and pricing controls.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="feature-card h-100">
              <FaCalendarCheck className="feature-icon" />
              <h5>Bookings</h5>
              <p>Confirm, check-in, check-out and cancel quickly.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="feature-card h-100">
              <FaUserTie className="feature-icon" />
              <h5>Staff Control</h5>
              <p>Manage staffing, salary updates and active states.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="feature-card h-100">
              <FaChartLine className="feature-icon" />
              <h5>Business Insights</h5>
              <p>Monitor revenue, occupancy and operational health.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
