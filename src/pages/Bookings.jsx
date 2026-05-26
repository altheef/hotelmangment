import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Header from "../components/Header";
import {
  cancelBooking,
  clearBookings,
  updateBookingStatus,
} from "../redux/slices/bookingSlice";
import { updateRoomStatus } from "../redux/slices/roomSlice";

function Bookings() {
  const dispatch = useDispatch();

  const bookings = useSelector(
    (state) => state.bookingReducer.bookings
  );

  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const bookingStatuses = [
    "All",
    "Confirmed",
    "Checked In",
    "Checked Out",
    "Cancelled",
  ];

  const filteredBookings = useMemo(
    () =>
      bookings.filter((booking) => {
        const byName = booking.customerName
          .toLowerCase()
          .includes(searchKey.toLowerCase());

        const byStatus =
          statusFilter === "All" ||
          booking.status === statusFilter;

        return byName && byStatus;
      }),
    [bookings, searchKey, statusFilter]
  );

  const totalRevenue = bookings.reduce(
    (total, booking) => total + booking.price,
    0
  );

  const handleCancel = (bookingId, roomId) => {
    Swal.fire({
      title: "Cancel booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cancel Booking",
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      dispatch(cancelBooking(bookingId));
      dispatch(
        updateRoomStatus({
          id: roomId,
          status: "Available",
        })
      );

      Swal.fire("Cancelled", "Booking removed", "success");
    });
  };

  const updateStatus = (booking, status) => {
    dispatch(
      updateBookingStatus({
        id: booking.id,
        status,
      })
    );

    if (status === "Checked Out") {
      dispatch(
        updateRoomStatus({
          id: booking.roomId,
          status: "Available",
        })
      );
    }

    Swal.fire({
      icon: "success",
      title: `Status updated to ${status}`,
      timer: 1000,
      showConfirmButton: false,
    });
  };

  const clearAll = () => {
    if (bookings.length === 0) {
      return;
    }

    Swal.fire({
      title: "Clear all bookings?",
      text: "This will remove every booking record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Clear All",
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      bookings.forEach((booking) => {
        dispatch(
          updateRoomStatus({
            id: booking.roomId,
            status: "Available",
          })
        );
      });

      dispatch(clearBookings());

      Swal.fire("Done", "All bookings cleared", "success");
    });
  };

  return (
    <>
      <Header />

      <div className="container page-shell">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <h1 className="page-title mb-0">Booking Management</h1>

          <button
            className="btn btn-outline-danger"
            onClick={clearAll}
            disabled={bookings.length === 0}
          >
            Clear All Bookings
          </button>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="metric-card metric-blue">
              <h6>Total Bookings</h6>
              <h2>{bookings.length}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="metric-card metric-green">
              <h6>Revenue</h6>
              <h2>Rs {totalRevenue}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="metric-card metric-gold">
              <h6>Filtered Results</h6>
              <h2>{filteredBookings.length}</h2>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-8">
                <label className="form-label">Search by customer</label>
                <input
                  type="text"
                  className="form-control"
                  value={searchKey}
                  onChange={(event) => setSearchKey(event.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Filter by status</label>
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                >
                  {bookingStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {filteredBookings.length > 0 ? (
          <div className="table-responsive card border-0 shadow-sm p-3">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Room</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <td>{index + 1}</td>
                    <td>{booking.customerName}</td>
                    <td>{booking.roomName}</td>
                    <td>{booking.checkIn}</td>
                    <td>{booking.checkOut}</td>
                    <td>{booking.guestCount}</td>
                    <td>
                      <span className="badge text-bg-primary">
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            updateStatus(booking, "Checked In")
                          }
                        >
                          Check In
                        </button>

                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() =>
                            updateStatus(booking, "Checked Out")
                          }
                        >
                          Check Out
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleCancel(booking.id, booking.roomId)
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-warning mb-0">
            No bookings found for current filters.
          </div>
        )}
      </div>
    </>
  );
}

export default Bookings;
