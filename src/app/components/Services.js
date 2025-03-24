'use client'
import React, { useEffect, useState } from "react";
import { getServices, deleteService } from "../api/api";
import { Table} from "@/components/ui/table"; 
import { Button } from "@/components/ui/button"; 

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const data = await getServices();
    setServices(data);
  };

  const handleDelete = async (id) => {
    await deleteService(id);
    fetchServices();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Services</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>${service.price}</td>
              <td>
                <Button onClick={() => handleDelete(service._id)} variant="destructive">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Services;
