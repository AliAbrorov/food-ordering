const { Schema, model, models, default: mongoose } = require("mongoose");

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, trim: true },
    streetAddress: { type: String },
    city: { type: String, required: true, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserInfo =
  mongoose.models?.UserInfo || mongoose.model("UserInfo", UserInfoSchema);
