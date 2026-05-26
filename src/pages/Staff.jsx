import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Header from "../components/Header";
import {
  addStaff,
  applySalaryHike,
  deleteStaff,
  initializeStaff,
  toggleStaffStatus,
  updateStaff,
} from "../redux/slices/staffSlice";

function Staff() {
  const dispatch = useDispatch();

  const staffs = useSelector((state) => state.staffReducer.staffs);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    salary: "",
    phone: "",
    status: "Active",
  });

  const [editId, setEditId] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(initializeStaff());
  }, [dispatch]);

  const filteredStaff = useMemo(
    () =>
      staffs.filter((item) => {
        const byName = item.name
          .toLowerCase()
          .includes(searchKey.toLowerCase());

        const byStatus =
          statusFilter === "All" ||
          item.status === statusFilter;

        return byName && byStatus;
      }),
    [staffs, searchKey, statusFilter]
  );

  const activeCount = staffs.filter(
    (item) => item.status === "Active"
  ).length;

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setFormData({
      name: "",
      position: "",
      salary: "",
      phone: "",
      status: "Active",
    });
    setEditId(null);
  };

  const handleSave = () => {
    const { name, position, salary, phone, status } = formData;

    if (!name || !position || !salary || !phone) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Fill all staff details.",
      });
      return;
    }

    if (editId) {
      dispatch(
        updateStaff({
          id: editId,
          name,
          position,
          salary: Number(salary),
          phone,
          status,
        })
      );

      Swal.fire("Updated", "Staff updated", "success");
    } else {
      const nextId =
        staffs.reduce(
          (maxId, item) => Math.max(maxId, item.id),
          0
        ) + 1;

      dispatch(
        addStaff({
          id: nextId,
          name,
          position,
          salary: Number(salary),
          phone,
          status,
        })
      );

      Swal.fire("Added", "Staff member added", "success");
    }

    clearForm();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      name: item.name,
      position: item.position,
      salary: item.salary,
      phone: item.phone,
      status: item.status,
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete staff?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      dispatch(deleteStaff(id));
      Swal.fire("Deleted", "Staff removed", "success");
    });
  };

  return (
    <>
      <Header />

      <div className="container page-shell">
        <h1 className="page-title mb-4">Staff Management</h1>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="metric-card metric-blue">
              <h6>Total Staff</h6>
              <h2>{staffs.length}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="metric-card metric-green">
              <h6>Active Staff</h6>
              <h2>{activeCount}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="metric-card metric-gold">
              <h6>Showing Results</h6>
              <h2>{filteredStaff.length}</h2>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm p-4 mb-4">
          <h5 className="mb-3">
            {editId ? "Update Staff" : "Add Staff"}
          </h5>

          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control"
                value={formData.name}
                onChange={onInputChange}
              />
            </div>

            <div className="col-md-2">
              <input
                type="text"
                name="position"
                placeholder="Position"
                className="form-control"
                value={formData.position}
                onChange={onInputChange}
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                name="salary"
                placeholder="Salary"
                className="form-control"
                value={formData.salary}
                onChange={onInputChange}
              />
            </div>

            <div className="col-md-2">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="form-control"
                value={formData.phone}
                onChange={onInputChange}
              />
            </div>

            <div className="col-md-2">
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={onInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="col-md-1 d-grid">
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>

          <div className="mt-3">
            <button className="btn btn-outline-dark btn-sm" onClick={clearForm}>
              Reset Form
            </button>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-4 p-3">
          <div className="row g-3">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search staff by name"
                value={searchKey}
                onChange={(event) => setSearchKey(event.target.value)}
              />
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-responsive card border-0 shadow-sm p-3">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStaff.length > 0 ? (
                filteredStaff.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.position}</td>
                    <td>Rs {item.salary}</td>
                    <td>{item.phone}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.status === "Active"
                            ? "text-bg-success"
                            : "text-bg-secondary"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-info btn-sm"
                          onClick={() =>
                            dispatch(applySalaryHike(item.id))
                          }
                        >
                          +5% Hike
                        </button>

                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() =>
                            dispatch(toggleStaffStatus(item.id))
                          }
                        >
                          Toggle Status
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No staff found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Staff;
