import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(_, { params }) {
  await connectDB();
  const booking = await Booking.findById(params.id).populate("client");
  if (!booking) return Response.json({ message: "Booking not found" }, { status: 404 });
  return Response.json(booking);
}

export async function PUT(req, { params }) {
  await connectDB();
  const updates = await req.json();
  const updated = await Booking.findByIdAndUpdate(params.id, updates, { new: true });
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Booking.findByIdAndDelete(params.id);
  return Response.json({ message: "Booking deleted successfully" });
}

export async function PATCH(req, { params }) {
  await connectDB();
  const { status } = await req.json();
  if (!status) return Response.json({ error: "Status is required" }, { status: 400 });

  const updated = await Booking.findByIdAndUpdate(params.id, { status }, { new: true });
  if (!updated) return Response.json({ error: "Booking not found" }, { status: 404 });

  return Response.json({ success: true, booking: updated });
}
