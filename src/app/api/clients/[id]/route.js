import { connectDB } from "@/lib/mongodb";
import Client from "@/models/Client";

export async function GET(_, { params }) {
  await connectDB();
  const client = await Client.findById(params.id);
  if (!client) return Response.json({ message: "Client not found" }, { status: 404 });
  return Response.json(client);
}

export async function PUT(req, { params }) {
  await connectDB();
  const updates = await req.json();
  const updated = await Client.findByIdAndUpdate(params.id, updates, { new: true });
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Client.findByIdAndDelete(params.id);
  return Response.json({ message: "Client deleted successfully" });
}