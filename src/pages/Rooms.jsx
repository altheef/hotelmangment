import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Header from "../components/Header";
import RoomCard from "../components/RoomCard";
import {
  addRoom,
  initializeRooms,
} from "../redux/slices/roomSlice";

function Rooms() {
  const dispatch = useDispatch();

  const { allRooms } = useSelector((state) => state.roomReducer);

  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("none");

  const [currentPage, setCurrentPage] = useState(1);
  const roomPerPage = 8;

  const [showAddForm, setShowAddForm] = useState(false);

  const [roomForm, setRoomForm] = useState({
    roomName: "",
    roomType: "Deluxe",
    price: "",
    capacity: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    dispatch(initializeRooms());
  }, [dispatch]);

  const roomTypes = useMemo(
    () => [
      "All",
      ...new Set(allRooms.map((room) => room.roomType)),
    ],
    [allRooms]
  );

  const filteredRooms = useMemo(() => {
    const searched = allRooms.filter((room) => {
      const matchName = room.roomName
        .toLowerCase()
        .includes(searchKey.toLowerCase());

      const matchStatus =
        statusFilter === "All" ||
        room.status === statusFilter;

      const matchType =
        typeFilter === "All" ||
        room.roomType === typeFilter;

      return matchName && matchStatus && matchType;
    });

    if (sortBy === "priceLow") {
      return [...searched].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "priceHigh") {
      return [...searched].sort((a, b) => b.price - a.price);
    }

    if (sortBy === "name") {
      return [...searched].sort((a, b) =>
        a.roomName.localeCompare(b.roomName)
      );
    }

    return searched;
  }, [allRooms, searchKey, statusFilter, typeFilter, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRooms.length / roomPerPage)
  );

  const activePage = Math.min(currentPage, totalPages);

  const visibleRooms = filteredRooms.slice(
    (activePage - 1) * roomPerPage,
    activePage * roomPerPage
  );

  const availableCount = allRooms.filter(
    (room) => room.status === "Available"
  ).length;

  const bookedCount = allRooms.filter(
    (room) => room.status === "Booked"
  ).length;

  const handleRoomForm = (event) => {
    const { name, value } = event.target;

    setRoomForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addNewRoom = () => {
    const { roomName, roomType, price, capacity, image, description } =
      roomForm;

    if (
      !roomName ||
      !roomType ||
      !price ||
      !capacity ||
      !image ||
      !description
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing details",
        text: "Fill all room fields.",
      });
      return;
    }

    const nextId =
      allRooms.reduce(
        (maxId, room) => Math.max(maxId, room.id),
        0
      ) + 1;

    dispatch(
      addRoom({
        id: nextId,
        roomName,
        roomType,
        price: Number(price),
        capacity: Number(capacity),
        status: "Available",
        image,
        description,
      })
    );

    Swal.fire({
      icon: "success",
      title: "Room added",
      timer: 1200,
      showConfirmButton: false,
    });

    setRoomForm({
      roomName: "",
      roomType: "Deluxe",
      price: "",
      capacity: "",
      image: "",
      description: "",
    });

    setShowAddForm(false);
  };

  const resetFilters = () => {
    setSearchKey("");
    setStatusFilter("All");
    setTypeFilter("All");
    setSortBy("none");
    setCurrentPage(1);
  };

  return (
    <>
      <Header />

      <div className="container page-shell">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <h1 className="page-title mb-0">Room Management</h1>

          <button
            className="btn btn-primary"
            onClick={() => setShowAddForm((prevState) => !prevState)}
          >
            {showAddForm ? "Close Form" : "Add New Room"}
          </button>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="metric-card metric-blue">
              <h6>Total Rooms</h6>
              <h2>{allRooms.length}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="metric-card metric-green">
              <h6>Available Rooms</h6>
              <h2>{availableCount}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="metric-card metric-red">
              <h6>Booked Rooms</h6>
              <h2>{bookedCount}</h2>
            </div>
          </div>
        </div>

        {showAddForm && (
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="mb-3">Add Room</h5>

              <div className="row g-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    name="roomName"
                    className="form-control"
                    placeholder="Room Name"
                    value={roomForm.roomName}
                    onChange={handleRoomForm}
                  />
                </div>

                <div className="col-md-2">
                  <select
                    name="roomType"
                    className="form-select"
                    value={roomForm.roomType}
                    onChange={handleRoomForm}
                  >
                    <option>Deluxe</option>
                    <option>Suite</option>
                    <option>Standard</option>
                    <option>Family</option>
                    <option>Studio</option>
                  </select>
                </div>

                <div className="col-md-2">
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Price"
                    value={roomForm.price}
                    onChange={handleRoomForm}
                  />
                </div>

                <div className="col-md-2">
                  <input
                    type="number"
                    name="capacity"
                    className="form-control"
                    placeholder="Capacity"
                    value={roomForm.capacity}
                    onChange={handleRoomForm}
                  />
                </div>

                <div className="col-md-2 d-grid">
                  <button className="btn btn-success" onClick={addNewRoom}>
                    Save Room
                  </button>
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    placeholder="Image URL"
                    value={roomForm.image}
                    onChange={handleRoomForm}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    value={roomForm.description}
                    onChange={handleRoomForm}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-lg-3">
                <label className="form-label">Search Room</label>
                <input
                  type="text"
                  className="form-control"
                  value={searchKey}
                  onChange={(event) => {
                    setSearchKey(event.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="col-lg-2 col-md-4">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All</option>
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                </select>
              </div>

              <div className="col-lg-2 col-md-4">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={typeFilter}
                  onChange={(event) => {
                    setTypeFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {roomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-2 col-md-4">
                <label className="form-label">Sort</label>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(event) => {
                    setSortBy(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="none">Default</option>
                  <option value="priceLow">Price Low</option>
                  <option value="priceHigh">Price High</option>
                  <option value="name">Name</option>
                </select>
              </div>

              <div className="col-lg-3 d-grid">
                <button className="btn btn-outline-dark" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {visibleRooms.map((room) => (
            <div className="col-xl-3 col-lg-4 col-md-6" key={room.id}>
              <RoomCard room={room} />
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="alert alert-warning mt-4 mb-0">
            No rooms matched your filters.
          </div>
        )}

        <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
          <button
            className="btn btn-dark"
            disabled={activePage === 1}
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(1, prevPage - 1))
            }
          >
            Prev
          </button>

          <span className="px-2">
            Page {activePage} of {totalPages}
          </span>

          <button
            className="btn btn-dark"
            disabled={activePage === totalPages}
            onClick={() =>
              setCurrentPage((prevPage) =>
                Math.min(totalPages, prevPage + 1)
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Rooms;
