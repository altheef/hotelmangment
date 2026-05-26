import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",

  initialState: {
    customers: [],
    dummyCustomers: []
  },

  reducers: {

    initializeCustomer: (state) => {
      state.dummyCustomers = state.customers;
    },

    addCustomer: (state, action) => {
      state.customers.push(action.payload);
      state.dummyCustomers.push(action.payload);
    },

    deleteCustomer: (state, action) => {

      state.customers =
        state.customers.filter(
          customer =>
            customer.id !== action.payload
        );

      state.dummyCustomers =
        state.dummyCustomers.filter(
          customer =>
            customer.id !== action.payload
        );
    },

    updateCustomer: (state, action) => {

      const index =
        state.customers.findIndex(
          customer =>
            customer.id === action.payload.id
        );

      if (index !== -1) {
        state.customers[index] =
          action.payload;
      }

      state.dummyCustomers =
        [...state.customers];
    },

    searchCustomer: (state, action) => {

      state.customers =
        state.dummyCustomers.filter(
          customer =>
            customer.name
              .toLowerCase()
              .includes(
                action.payload.toLowerCase()
              )
        );
    }
  }
});

export const {
  addCustomer,
  deleteCustomer,
  updateCustomer,
  searchCustomer,
  initializeCustomer
}
=
customerSlice.actions;

export default customerSlice.reducer;