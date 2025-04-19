import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";

export async function GET(_, { params }) {
  await connectDB();
  const message = await Message.findById(params.id);
  if (!message) return Response.json({ message: "Message not found" }, { status: 404 });
  return Response.json(message);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Message.findByIdAndDelete(params.id);
  return Response.json({ message: "Message deleted successfully" });
}