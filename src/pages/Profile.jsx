import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { updateCurrentUser } from "../redux/slices/authSlice";

const DEFAULT_PROFILE = {
  hotelName: "Grand Palace Hotel",
  ownerName: "Admin User",
  email: "hotel@gmail.com",
  phone: "9876543210",
  address: "Kochi, Kerala",
  totalRooms: 24,
  website: "www.grandpalace.com",
  checkInTime: "13:00",
  checkOutTime: "11:00",
};

const readStoredProfile = () => {
  if (typeof window === "undefined") {
    return DEFAULT_PROFILE;
  }

  try {
    const rawValue = window.localStorage.getItem("hotelProfile");
    return rawValue ? JSON.parse(rawValue) : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
};

function Profile() {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state) => state.authReducer.currentUser
  );

  const rooms = useSelector((state) => state.roomReducer.allRooms);
  const bookings = useSelector(
    (state) => state.bookingReducer.bookings
  );
  const staffs = useSelector((state) => state.staffReducer.staffs);

  const [profile, setProfile] = useState(() => {
    const storedProfile = readStoredProfile();

    if (!currentUser) {
      return storedProfile;
    }

    return {
      ...storedProfile,
      ownerName: storedProfile.ownerName || currentUser.name,
      email: storedProfile.email || currentUser.email,
    };
  });

  const totalRevenue = useMemo(
    () =>
      bookings.reduce(
        (total, booking) => total + booking.price,
        0
      ),
    [bookings]
  );

  const handleUpdate = () => {
    if (!profile.hotelName || !profile.ownerName || !profile.email) {
      Swal.fire({
        icon: "warning",
        title: "Missing details",
        text: "Hotel name, owner name and email are required.",
      });
      return;
    }

    window.localStorage.setItem(
      "hotelProfile",
      JSON.stringify(profile)
    );

    if (currentUser) {
      dispatch(
        updateCurrentUser({
          name: profile.ownerName,
          email: profile.email,
        })
      );
    }

    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Hotel profile saved successfully.",
    });
  };

  const resetToDefault = () => {
    setProfile(DEFAULT_PROFILE);
  };

  const useDemoProfile = () => {
    setProfile({
      hotelName: "Skyline Retreat",
      ownerName: "Nikita Raj",
      email: "contact@skyline-retreat.com",
      phone: "9000011122",
      address: "Marine Drive, Kochi",
      totalRooms: 36,
      website: "www.skylineretreat.com",
      checkInTime: "14:00",
      checkOutTime: "12:00",
    });
  };

  return (
    <>
      <Header />

      <div className="container page-shell">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <h1 className="page-title mb-0">Hotel Profile</h1>

          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-success" onClick={handleUpdate}>
              Save Changes
            </button>

            <button className="btn btn-outline-dark" onClick={resetToDefault}>
              Reset
            </button>

            <button className="btn btn-outline-primary" onClick={useDemoProfile}>
              Load Demo
            </button>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="metric-card metric-blue">
              <h6>Rooms</h6>
              <h2>{rooms.length}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="metric-card metric-green">
              <h6>Bookings</h6>
              <h2>{bookings.length}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="metric-card metric-gold">
              <h6>Revenue</h6>
              <h2>Rs {totalRevenue}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="metric-card metric-red">
              <h6>Staff</h6>
              <h2>{staffs.length}</h2>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Hotel Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.hotelName}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      hotelName: event.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Owner Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.ownerName}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      ownerName: event.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={profile.email}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      email: event.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.phone}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      phone: event.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-8">
                <label className="form-label">Address</label>
                <textarea
                  rows="3"
                  className="form-control"
                  value={profile.address}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      address: event.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="col-md-4">
                <label className="form-label">Website</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.website}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      website: event.target.value,
                    })
                  }
                />

                <label className="form-label mt-3">Total Rooms</label>
                <input
                  type="number"
                  className="form-control"
                  value={profile.totalRooms}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      totalRooms: event.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Check-In Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={profile.checkInTime}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      checkInTime: event.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Check-Out Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={profile.checkOutTime}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      checkOutTime: event.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
