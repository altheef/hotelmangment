import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRooms: [
    {
      id: 1,
      roomName: "Deluxe Room 101",
      roomType: "Deluxe",
      price: 4500,
      capacity: 2,
      status: "Available",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
      description: "Elegant deluxe room with king-size bed and city view.",
    },
    {
      id: 2,
      roomName: "Executive Suite 102",
      roomType: "Suite",
      price: 7800,
      capacity: 4,
      status: "Available",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
      description: "Premium suite with balcony, lounge and workspace.",
    },
    {
      id: 3,
      roomName: "Standard Room 103",
      roomType: "Standard",
      price: 3000,
      capacity: 2,
      status: "Booked",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      description: "Comfortable standard room for short business stays.",
    },
    {
      id: 4,
      roomName: "Family Room 104",
      roomType: "Family",
      price: 6200,
      capacity: 5,
      status: "Available",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      description: "Spacious family room with two queen beds.",
    },
    {
      id: 5,
      roomName: "Studio Room 105",
      roomType: "Studio",
      price: 3900,
      capacity: 2,
      status: "Available",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      description: "Modern studio with cozy decor and mini pantry.",
    },
    {
      id: 6,
      roomName: "Ocean View 106",
      roomType: "Deluxe",
      price: 6900,
      capacity: 3,
      status: "Booked",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      description: "Sea-facing deluxe room with breakfast included.",
    },
    {
      id: 7,
      roomName: "Garden Suite 107",
      roomType: "Suite",
      price: 8200,
      capacity: 4,
      status: "Available",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
      description: "Suite with private garden patio and lounge area.",
    },
    {
      id: 8,
      roomName: "Classic Room 108",
      roomType: "Standard",
      price: 2800,
      capacity: 2,
      status: "Available",
      image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a",
      description: "Classic room with warm interior and work desk.",
    },
    {
      id: 9,
      roomName: "Premium Room 109",
      roomType: "Deluxe",
      price: 5400,
      capacity: 3,
      status: "Available",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
      description: "Premium room with rain shower and lounge chair.",
    },
    {
      id: 10,
      roomName: "Royal Suite 110",
      roomType: "Suite",
      price: 9500,
      capacity: 4,
      status: "Booked",
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
      description: "Top-tier suite with private dining and skyline view.",
    },
    {
      id: 11,
      roomName: "Business Room 201",
      roomType: "Standard",
      price: 3400,
      capacity: 2,
      status: "Available",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      description: "Quiet room optimized for business travelers.",
    },
    {
      id: 12,
      roomName: "Couple Retreat 202",
      roomType: "Deluxe",
      price: 5100,
      capacity: 2,
      status: "Available",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
      description: "Romantic room package with candlelight setup.",
    },
    {
      id: 13,
      roomName: "Family Plus 203",
      roomType: "Family",
      price: 6700,
      capacity: 6,
      status: "Available",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
      description: "Large family room with connected seating area.",
    },
    {
      id: 14,
      roomName: "Loft Studio 204",
      roomType: "Studio",
      price: 4300,
      capacity: 2,
      status: "Booked",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      description: "Loft-inspired studio with artistic interior.",
    },
    {
      id: 15,
      roomName: "Penthouse 205",
      roomType: "Suite",
      price: 12500,
      capacity: 5,
      status: "Available",
      image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a",
      description: "Luxury penthouse with jacuzzi and terrace bar.",
    },
    {
      id: 16,
      roomName: "Comfort Room 206",
      roomType: "Standard",
      price: 3200,
      capacity: 2,
      status: "Available",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      description: "Affordable comfort room with all essentials.",
    },
    {
      id: 17,
      roomName: "Skyline Deluxe 207",
      roomType: "Deluxe",
      price: 6100,
      capacity: 3,
      status: "Available",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      description: "High-floor room with panoramic skyline view.",
    },
    {
      id: 18,
      roomName: "Twin Standard 208",
      roomType: "Standard",
      price: 2900,
      capacity: 2,
      status: "Available",
      image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
      description: "Twin-bed standard room for friends and colleagues.",
    },
    {
      id: 19,
      roomName: "Heritage Suite 209",
      roomType: "Suite",
      price: 8800,
      capacity: 4,
      status: "Available",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
      description: "Classic heritage theme with premium furnishing.",
    },
    {
      id: 20,
      roomName: "Kids Family 210",
      roomType: "Family",
      price: 6400,
      capacity: 5,
      status: "Booked",
      image: "https://images.unsplash.com/photo-1571844307880-751c6d86f3f3",
      description: "Family room with kids corner and play station.",
    },
    {
      id: 21,
      roomName: "Elite Studio 211",
      roomType: "Studio",
      price: 4700,
      capacity: 2,
      status: "Available",
      image: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41",
      description: "Elite studio with smart TV and coffee setup.",
    },
    {
      id: 22,
      roomName: "Sunrise Deluxe 212",
      roomType: "Deluxe",
      price: 5600,
      capacity: 3,
      status: "Available",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      description: "Sunrise-facing deluxe room with balcony seating.",
    },
    {
      id: 23,
      roomName: "Urban Suite 213",
      roomType: "Suite",
      price: 9100,
      capacity: 4,
      status: "Available",
      image: "https://images.unsplash.com/photo-1455587734955-081b22074882",
      description: "Urban luxury suite for extended premium stays.",
    },
    {
      id: 24,
      roomName: "Transit Room 214",
      roomType: "Standard",
      price: 2600,
      capacity: 2,
      status: "Available",
      image: "https://images.unsplash.com/photo-1616594039964-5d604f7a8cf2",
      description: "Quick-stay room for short transit travelers.",
    },
  ],
  dummyRooms: [],
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    initializeRooms: (state) => {
      state.dummyRooms = [...state.allRooms];
    },

    addRoom: (state, action) => {
      state.allRooms.push(action.payload);
      state.dummyRooms.push(action.payload);
    },

    deleteRoom: (state, action) => {
      state.allRooms = state.allRooms.filter(
        (item) => item.id !== action.payload
      );

      state.dummyRooms = state.dummyRooms.filter(
        (item) => item.id !== action.payload
      );
    },

    updateRoomStatus: (state, action) => {
      const { id, status } = action.payload;

      state.allRooms = state.allRooms.map((room) =>
        room.id === id ? { ...room, status } : room
      );

      state.dummyRooms = [...state.allRooms];
    },
  },
});

export const {
  addRoom,
  deleteRoom,
  initializeRooms,
  updateRoomStatus,
} = roomSlice.actions;

export default roomSlice.reducer;
