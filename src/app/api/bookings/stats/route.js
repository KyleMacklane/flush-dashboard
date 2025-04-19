import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET() {
  await connectDB();
  const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
  const stats = await Booking.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  const result = statuses.reduce((acc, status) => {
    acc[status] = stats.find(s => s._id === status)?.count || 0;
    return acc;
  }, {});

  return Response.json(result);
}
