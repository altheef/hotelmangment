import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
  name: "staff",

  initialState: {
    staffs: [
      {
        id: 1,
        name: "Rahul Kumar",
        position: "General Manager",
        salary: 55000,
        phone: "9876543210",
        status: "Active",
      },
      {
        id: 2,
        name: "Anjali Nair",
        position: "Receptionist",
        salary: 28000,
        phone: "9876543211",
        status: "Active",
      },
      {
        id: 3,
        name: "John Mathew",
        position: "Chef",
        salary: 38000,
        phone: "9876543212",
        status: "Active",
      },
      {
        id: 4,
        name: "Priya Menon",
        position: "Housekeeping",
        salary: 22000,
        phone: "9876543213",
        status: "Active",
      },
      {
        id: 5,
        name: "Arun Das",
        position: "Security",
        salary: 24000,
        phone: "9876543214",
        status: "Inactive",
      },
    ],

    dummyStaffs: [],
  },

  reducers: {
    initializeStaff: (state) => {
      state.dummyStaffs = [...state.staffs];
    },

    addStaff: (state, action) => {
      state.staffs.push(action.payload);
      state.dummyStaffs.push(action.payload);
    },

    deleteStaff: (state, action) => {
      state.staffs = state.staffs.filter(
        (staff) => staff.id !== action.payload
      );

      state.dummyStaffs = state.dummyStaffs.filter(
        (staff) => staff.id !== action.payload
      );
    },

    updateStaff: (state, action) => {
      const index = state.staffs.findIndex(
        (staff) => staff.id === action.payload.id
      );

      if (index !== -1) {
        state.staffs[index] = action.payload;
      }

      state.dummyStaffs = [...state.staffs];
    },

    toggleStaffStatus: (state, action) => {
      state.staffs = state.staffs.map((staff) => {
        if (staff.id !== action.payload) {
          return staff;
        }

        return {
          ...staff,
          status:
            staff.status === "Active"
              ? "Inactive"
              : "Active",
        };
      });

      state.dummyStaffs = [...state.staffs];
    },

    applySalaryHike: (state, action) => {
      state.staffs = state.staffs.map((staff) => {
        if (staff.id !== action.payload) {
          return staff;
        }

        const nextSalary = Math.round(staff.salary * 1.05);
        return { ...staff, salary: nextSalary };
      });

      state.dummyStaffs = [...state.staffs];
    },

    searchStaff: (state, action) => {
      state.staffs = state.dummyStaffs.filter((staff) =>
        staff.name
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
    },
  },
});

export const {
  initializeStaff,
  addStaff,
  deleteStaff,
  updateStaff,
  toggleStaffStatus,
  applySalaryHike,
  searchStaff,
} = staffSlice.actions;

export default staffSlice.reducer;
