import { connectDB } from "@/lib/mongodb";
import Client from "@/models/Client";

export async function GET() {
  await connectDB();
  const clients = await Client.find().sort({ createdAt: -1 });
  return Response.json(clients);
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newClient = await new Client(body).save();
    return Response.json({ message: "Client created successfully", client: newClient }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}