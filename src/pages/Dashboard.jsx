import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";

function Dashboard() {
  const rooms = useSelector(
    (state) => state.roomReducer.allRooms
  );

  const bookings = useSelector(
    (state) => state.bookingReducer.bookings
  );

  const customers = useSelector(
    (state) => state.customerReducer.customers
  );

  const staffs = useSelector(
    (state) => state.staffReducer.staffs
  );

  const availableRooms = rooms.filter(
    (room) => room.status === "Available"
  );

  const bookedRooms = rooms.filter(
    (room) => room.status === "Booked"
  );

  const totalRevenue = bookings.reduce(
    (total, booking) => total + booking.price,
    0
  );

  return (
    <>
      <Header />

      <div className="container page-shell">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <h1 className="page-title mb-0">Hotel Dashboard</h1>

          <div className="d-flex gap-2 flex-wrap">
            <Link to="/rooms" className="btn btn-primary btn-sm">
              Manage Rooms
            </Link>

            <Link to="/bookings" className="btn btn-success btn-sm">
              Manage Bookings
            </Link>

            <Link to="/staff" className="btn btn-dark btn-sm">
              Manage Staff
            </Link>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="metric-card metric-blue">
              <h6>Total Rooms</h6>
              <h2>{rooms.length}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="metric-card metric-green">
              <h6>Available Rooms</h6>
              <h2>{availableRooms.length}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="metric-card metric-red">
              <h6>Booked Rooms</h6>
              <h2>{bookedRooms.length}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="metric-card metric-gold">
              <h6>Total Revenue</h6>
              <h2>Rs {totalRevenue}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="metric-card">
              <h6>Total Bookings</h6>
              <h2>{bookings.length}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="metric-card">
              <h6>Total Customers</h6>
              <h2>{customers.length}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="metric-card">
              <h6>Team Members</h6>
              <h2>{staffs.length}</h2>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h4 className="mb-3">Recent Bookings</h4>

            {bookings.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped align-middle mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer</th>
                      <th>Room</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings
                      .slice(-5)
                      .reverse()
                      .map((booking, index) => (
                        <tr key={booking.id}>
                          <td>{index + 1}</td>
                          <td>{booking.customerName}</td>
                          <td>{booking.roomName}</td>
                          <td>{booking.checkIn}</td>
                          <td>{booking.checkOut}</td>
                          <td>
                            <span className="badge text-bg-primary">
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mb-0 text-secondary">No bookings yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
