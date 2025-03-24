'use client'

import React, { useEffect, useState } from "react";
import { getClients, deleteClient } from "../api/api";
import { Table} from "@/components/ui/table"; 
import { Button } from "@/components/ui/button"; 

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const data = await getClients();
    setClients(data);
  };

  const handleDelete = async (id) => {
    await deleteClient(id);
    fetchClients();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Clients</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>
                <Button onClick={() => handleDelete(client._id)} variant="destructive">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Clients;
