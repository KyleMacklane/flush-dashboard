"use client";

import { useState, useEffect } from "react";

import { getBookings, deleteBooking, deleteMessage, deleteClient, deleteService } from "./api/api";

import { Card, CardContent } from "../components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { MessageSquare, Users, Calendar, Briefcase, Trash, Pencil } from "lucide-react";
import {
  AlertDialog, AlertDialogTitle, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogAction, AlertDialogDescription,
  AlertDialogCancel
} from "../components/ui/alert-dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { UserButton, SignOutButton } from '@clerk/nextjs';
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
// import { useRouter, useSearchParams } from "next/navigation";



const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  // const [services, setServices] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const currentTab = searchParams.get("tab") || "clients";

  // const handleTabChange = (value) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("tab", value);
  //   router.replace(`?${params.toString()}`);
  // };

  useEffect(() => {
    fetchData();
  }, []);



  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [clientsRes, bookingsRes, messagesRes] = await Promise.all([
        fetch("/api/clients"),
        fetch("/api/bookings"),
        fetch("/api/messages"),
     
      ]);
      const [clientsData, bookingsData, messagesData, ] = await Promise.all([
        clientsRes.json(), bookingsRes.json(), messagesRes.json(),
      ]);
      setClients(clientsData);
      setBookings(bookingsData);
      setMessages(messagesData);
      
    } catch (err) {
      setError("Failed to load data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };





  const handleDeleteClient = async (id) => {
    await deleteClient(id);
    fetchData();
  };
  const handleDeleteBooking = async (id) => {
    await deleteBooking(id);
    fetchData();
  };
  const handleDeleteMessages = async (id) => {
    await deleteMessage(id);
    fetchData();
  };

  const handleStatusChange = async (id, newStatus) => {
    if (!id) {
      console.error("Error: ID is undefined!");
      return;
    }

    console.log("Updating status for:", id, "New Status:", newStatus);

    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      // Read response as text first to debug
      const textResponse = await response.text();
      console.log("Raw Response:", textResponse);

      // Try to parse JSON
      const data = JSON.parse(textResponse);
      console.log("Parsed Response:", data);

      if (!response.ok) {
        throw new Error(`Failed to update status: ${data.message || response.statusText}`);
      }

      // Update the UI immediately
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? { ...booking, status: newStatus } : booking
        )
      );

    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Check console for details.");
    }
  };

  // status cards
  const [stats, setStats] = useState({
    Pending: 0,
    Confirmed: 0,
    Completed: 0,
    Cancelled: 0
  });
  const [darkMode, setDarkMode] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/bookings/stats");
      const data = await response.json();
      setStats(data); // Update state
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  useEffect(() => {
    fetchStats(); // Fetch stats when component mounts
  }, []);




  return (
    <>
      <SignedIn>
        {loading ? <div className="flex justify-center items-center h-screen">
          <Ring size={50} speed={1.5} bgOpacity={0.25} />
        </div>
          : error ? <p>{error}</p> :

            <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"} p-4 md:p-6`}>


              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h1 className="text-xl sm:text-2xl font-bold mb-4">Flush Cleaning Dashboard</h1>
                <div className="flex gap-4 items-center">
                  <button
                    className="p-2 bg-gray-800 text-white rounded"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? "🌞" : "🌙"}
                  </button>
                  {/* <UserButton /> */}
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Pending", value: stats.Pending, color: "bg-blue-600" },
                  { label: "Confirmed", value: stats.Confirmed, color: "bg-green-600" },
                  { label: "Completed", value: stats.Completed, color: "bg-gray-600" },
                  { label: "Cancelled", value: stats.Cancelled, color: "bg-red-600" }
                ].map(({ label, value, color }) => (
                  <div key={label} className={`p-6 rounded-lg text-white ${color}`}>
                    <h2 className="text-xl font-bold">{value}</h2>
                    <p>{label} Bookings</p>
                  </div>
                ))}

              </div>
      
              {/* <Tabs value={currentTab} onValueChange={handleTabChange}> */}
              <Tabs defaultValue="clients" className="w-full" >
                <TabsList className="flex flex-wrap gap-2 mb-4">
                  <TabsTrigger value="clients"><Users className="flex items-center gap-1" /> Clients</TabsTrigger>
                  <TabsTrigger value="bookings"><Calendar className="flex items-center gap-1" /> Bookings</TabsTrigger>
                  <TabsTrigger value="messages"><MessageSquare className="flex items-center gap-1" /> Messages</TabsTrigger>
                  {/* <TabsTrigger value="services"><Briefcase className="mr-2" /> Services</TabsTrigger> */}
                </TabsList>

                {/* Clients Section */}
                <TabsContent value="clients">
                  <Card>
                    <CardContent className="overflow-auto">
                      <Table className="min-w-[600px]">
                        <TableHeader className="font-bold text-base">
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clients.map(client => (
                            <TableRow key={client.id}>
                              <TableCell>{client.name}</TableCell>
                              <TableCell>{client.email}</TableCell>
                              <TableCell>{client.phone}</TableCell>
                              <TableCell>
                                {/* <Button variant="outline" className="mr-2">
                          <Pencil size={16} />
                        </Button> */}
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" onClick={() => setSelectedClient(client._id)}>
                                      <Trash size={16} />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you sure you want to delete this client?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete
                                        and remove them from the database.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteClient(client._id)}>Confirm</AlertDialogAction>

                                      {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <Button variant="destructive" onClick={() => handleDelete(selectedBooking)}>Delete</Button> */}
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>

                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Bookings Section */}
                <TabsContent value="bookings">
                  <Card>
                    <CardContent className="overflow-auto">
                      <Table className="min-w-[900px]">
                        <TableHeader className="font-bold text-base">
                          <TableRow>
                            <TableCell>Client</TableCell>
                            <TableCell>Contact(Email/Phone)</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Service</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bookings.map(booking => (
                            <TableRow key={booking._id}>
                              <TableCell>{booking.client?.name || "Unknown"}</TableCell>
                              <TableCell>{booking.client?.email || "No Email"} / {booking.client?.phone || "No Phone"}</TableCell>
                              {/* <TableCell>{booking.client?.phone || "No Phone"}</TableCell> */}

                              <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell>{booking.service}</TableCell>

                              <TableCell>
                                <Select onValueChange={(value) => {
                                  console.log("Booking ID:", booking.id, "New Status:", value);
                                  handleStatusChange(booking._id, value)
                                }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder={booking.status} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Confirmed">Confirmed</SelectItem>

                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>

                              <TableCell>{booking.address}</TableCell>
                              <TableCell>{booking.message}</TableCell>
                              <TableCell>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" onClick={() => setSelectedBooking(booking._id)}>
                                      <Trash size={16} />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you sure you want to delete this booking?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete
                                        and remove it from the database.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteBooking(booking._id)}>Confirm</AlertDialogAction>

                                      {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <Button variant="destructive" onClick={() => handleDelete(selectedBooking)}>Delete</Button> */}
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>


                {/* Messages Section */}
                <TabsContent value="messages">
                  <Card>
                    <CardContent className="overflow-auto">
                      <Table className="min-w-[600px]">
                        <TableHeader className="font-bold text-base">
                          <TableRow>
                            <TableCell>Client</TableCell>
                            <TableCell>Contact (Email/Phone)</TableCell>
                            <TableCell>Service</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {messages.map((msg) => (
                            <TableRow key={msg._id}>
                              <TableCell>{msg.client?.name || "Unknown"}</TableCell>
                              <TableCell>
                                {msg.client?.email || "No Email"} / {msg.client?.phone || "No Phone"}
                              </TableCell>
                              <TableCell>{msg.service}</TableCell>
                              <TableCell>{msg.message}</TableCell>
                              <TableCell>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" onClick={() => setSelectedMessage(msg._id)}>
                                      <Trash size={16} />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you sure you want to delete this message?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete
                                        and remove it from the database.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteMessages(msg._id)}>Confirm</AlertDialogAction>

                                      {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <Button variant="destructive" onClick={() => handleDelete(selectedBooking)}>Delete</Button> */}
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>


                {/* Services Section */}
                {/* <TabsContent value="services">
          <Card>
            <CardContent>
              {services.map(service => (
                <div key={service.id} className="border p-2 mb-2 flex justify-between items-center">
                  <p><strong>{service.name}</strong></p>
                  <Button variant="destructive" onClick={() => handleDelete("services", service.id)}>
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent> */}

              </Tabs>
              

              
            </div>
        }
      </SignedIn>
      <SignedOut>
        <SignIn path="/sign-in" routing="path" />
      </SignedOut>
    </>
  );

};


export default Dashboard;
