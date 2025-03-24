'use client'
import React, { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "../api/api";
import { Table} from "@/components/ui/table"; 
import { Button } from "@/components/ui/button"; 

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const data = await getBookings();
    setBookings(data);
  };

  const handleDelete = async (id) => {
    await deleteBooking(id);
    fetchBookings();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bookings</h2>
      <Table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.client.name}</td>
              <td>{booking.service.name}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.status}</td>
              <td>
                <Button onClick={() => handleDelete(booking._id)} variant="destructive">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Bookings;
