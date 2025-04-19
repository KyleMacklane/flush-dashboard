import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";

export async function GET() {
  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 });
  return Response.json(messages);
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newMessage = await new Message(body).save();
    return Response.json({ message: "Message received successfully", messageData: newMessage }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}