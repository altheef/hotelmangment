import axios from "axios";

// JSON Server Base URL
const BASE_URL = "http://localhost:3000";

// Get All Rooms
export const getAllRoomsAPI = async () => {
  return await axios.get(`${BASE_URL}/rooms`);
};

// Get Single Room
export const getRoomAPI = async (id) => {
  return await axios.get(`${BASE_URL}/rooms/${id}`);
};

// Add Room
export const addRoomAPI = async (roomData) => {
  return await axios.post(
    `${BASE_URL}/rooms`,
    roomData
  );
};

// Update Room
export const updateRoomAPI = async (
  id,
  roomData
) => {
  return await axios.put(
    `${BASE_URL}/rooms/${id}`,
    roomData
  );
};

// Delete Room
export const deleteRoomAPI = async (id) => {
  return await axios.delete(
    `${BASE_URL}/rooms/${id}`
  );
};