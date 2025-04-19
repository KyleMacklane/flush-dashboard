import axios from "axios";

const API_URL = "/api/"; 

// ✅ Clients API
export const getClients = async () => {
  const res = await axios.get(`${API_URL}/clients`);
  return res.data;
};

export const addClient = async (clientData) => {
  const res = await axios.post(`${API_URL}/clients`, clientData);
  return res.data;
};

export const deleteClient = async (id) => {
  await axios.delete(`${API_URL}/clients/${id}`);
};

// ✅ Bookings API
export const getBookings = async () => {
  const res = await axios.get(`${API_URL}/bookings`);
  return res.data;
};

export const addBooking = async (bookingData) => {
  const res = await axios.post(`${API_URL}/bookings`, bookingData);
  return res.data;
};

export const deleteBooking = async (id) => {
  await axios.delete(`${API_URL}/bookings/${id}`);
};

// ✅ Messages API
export const getMessages = async () => {
  const res = await axios.get(`${API_URL}/messages`);
  return res.data;
};

export const deleteMessage = async (id) => {
  await axios.delete(`${API_URL}/messages/${id}`);
};

// ✅ Services API
export const getServices = async () => {
  const res = await axios.get(`${API_URL}/services`);
  return res.data;
};

export const addService = async (serviceData) => {
  const res = await axios.post(`${API_URL}/services`, serviceData);
  return res.data;
};

export const deleteService = async (id) => {
  await axios.delete(`${API_URL}/services/${id}`);
};
