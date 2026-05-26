import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { addBooking } from "../redux/slices/bookingSlice";
import { updateRoomStatus } from "../redux/slices/roomSlice";

function RoomView() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const allRooms = useSelector(
    (state) => state.roomReducer.allRooms
  );

  const room = allRooms.find((item) => item.id === Number(id));

  const [customerName, setCustomerName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState("");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const diff = checkOutDate.getTime() - checkInDate.getTime();
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  }, [checkIn, checkOut]);

  const totalPrice = nights * (room?.price || 0);

  const handleBooking = () => {
    if (!room) {
      return;
    }

    if (room.status === "Booked") {
      Swal.fire({
        icon: "warning",
        title: "Room already booked",
        text: "Select another room to continue.",
      });
      return;
    }

    if (!customerName || !checkIn || !checkOut || !guestCount) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Fill all booking details.",
      });
      return;
    }

    if (nights <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid dates",
        text: "Check-out must be after check-in.",
      });
      return;
    }

    const booking = {
      id: Date.now(),
      customerName,
      roomId: room.id,
      roomName: room.roomName,
      price: room.price,
      checkIn,
      checkOut,
      guestCount: Number(guestCount),
      status: "Confirmed",
    };

    dispatch(addBooking(booking));
    dispatch(
      updateRoomStatus({
        id: room.id,
        status: "Booked",
      })
    );

    Swal.fire({
      icon: "success",
      title: "Booking successful",
      text: `${room.roomName} booked for ${customerName}.`,
    });

    setCustomerName("");
    setCheckIn("");
    setCheckOut("");
    setGuestCount("");
  };

  if (!room) {
    return (
      <>
        <Header />

        <div className="container page-shell">
          <div className="alert alert-danger">
            Room not found.
          </div>

          <Link to="/rooms" className="btn btn-primary">
            Back to Rooms
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="container page-shell">
        <div className="row g-4">
          <div className="col-lg-6">
            <img
              className="img-fluid rounded-4 shadow-sm"
              src={room.image}
              alt={room.roomName}
            />

            <div className="card border-0 shadow-sm mt-3">
              <div className="card-body">
                <h2 className="mb-1">{room.roomName}</h2>
                <p className="mb-1 text-secondary">{room.roomType}</p>
                <p className="mb-2 fw-semibold">Rs {room.price} / night</p>
                <p className="mb-2">{room.description}</p>

                <span
                  className={`badge ${
                    room.status === "Available"
                      ? "text-bg-success"
                      : "text-bg-danger"
                  }`}
                >
                  {room.status}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h4 className="mb-3">Book this room</h4>

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Customer Name"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                />

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Check In</label>
                    <input
                      type="date"
                      className="form-control"
                      value={checkIn}
                      onChange={(event) => setCheckIn(event.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Check Out</label>
                    <input
                      type="date"
                      className="form-control"
                      value={checkOut}
                      onChange={(event) => setCheckOut(event.target.value)}
                    />
                  </div>
                </div>

                <input
                  type="number"
                  className="form-control mt-3"
                  placeholder="Guest Count"
                  value={guestCount}
                  onChange={(event) => setGuestCount(event.target.value)}
                />

                <div className="booking-summary mt-4">
                  <p className="mb-1">Nights: {nights}</p>
                  <p className="mb-0 fw-semibold">Estimated Total: Rs {totalPrice}</p>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button
                    onClick={handleBooking}
                    className="btn btn-success flex-grow-1"
                  >
                    Confirm Booking
                  </button>

                  <Link to="/rooms" className="btn btn-outline-dark">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomView;
