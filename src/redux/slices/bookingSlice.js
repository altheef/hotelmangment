import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    dummyBookings: [],
  },

  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
      state.dummyBookings.push(action.payload);
    },

    cancelBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );

      state.dummyBookings = state.dummyBookings.filter(
        (booking) => booking.id !== action.payload
      );
    },

    updateBookingStatus: (state, action) => {
      const booking = state.bookings.find(
        (item) => item.id === action.payload.id
      );

      if (booking) {
        booking.status = action.payload.status;
      }

      state.dummyBookings = [...state.bookings];
    },

    clearBookings: (state) => {
      state.bookings = [];
      state.dummyBookings = [];
    },

    searchBooking: (state, action) => {
      state.bookings = state.dummyBookings.filter((booking) =>
        booking.customerName
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
    },

    initializeBookings: (state) => {
      state.dummyBookings = [...state.bookings];
    },
  },
});

export const {
  addBooking,
  cancelBooking,
  updateBookingStatus,
  clearBookings,
  searchBooking,
  initializeBookings,
} = bookingSlice.actions;

export default bookingSlice.reducer;
