const { Schema, default: mongoose } = require("mongoose");

const OrderSchema = new Schema(
  {
    userEmail: { type: String, trim: true },
    phone: { type: String, trim: true },
    streetAddress: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    cartProducts: Object,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models?.Order || mongoose.model("Order", OrderSchema);
