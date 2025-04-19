import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);

