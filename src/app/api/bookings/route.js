import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Client from "@/models/Client";

export async function GET() {
  await connectDB();
  const bookings = await Booking.find().populate("client", "name email phone").sort({ createdAt: -1 });
  return Response.json(bookings);
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { client, email, phone, service, date, address, message } = body;

    let existingClient = await Client.findOne({ email });

    if (!existingClient) {
      existingClient = await new Client({ name: client, email, phone }).save();
    }

    const newBooking = new Booking({
      client: existingClient._id,
      service,
      address,
      message,
      status: "Pending",
    });

    await newBooking.save();
    return Response.json({ message: "Booking created successfully!", booking: newBooking }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
