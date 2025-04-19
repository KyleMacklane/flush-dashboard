import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  service: { type: String, required: true },
  // date: { type: Date, required: true },
  address: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ["Pending", "Completed", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
