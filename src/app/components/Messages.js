'use client'
import React, { useEffect, useState } from "react";
import { getMessages, deleteMessage } from "../api/api";
import { Table} from "@/components/ui/table"; 
import { Button } from "@/components/ui/button"; 

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const data = await getMessages();
    setMessages(data);
  };

  const handleDelete = async (id) => {
    await deleteMessage(id);
    fetchMessages();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>
                <Button onClick={() => handleDelete(msg._id)} variant="destructive">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Messages;
