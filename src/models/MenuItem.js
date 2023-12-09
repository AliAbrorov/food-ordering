// const { Schema, default: mongoose, model, models } = require("mongoose");
import mongoose, { model, models, Schema } from "mongoose";

const extraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId },
    basePrice: { type: Number },
    sizes: { type: [extraPriceSchema] },
    extraIngredientPrices: { type: [extraPriceSchema] },
  },
  { timestamps: true }
);

export const MenuItem =
  mongoose.models?.MenuItem || mongoose.model("MenuItem", MenuItemSchema);

// export const Order =
//   mongoose.models?.Order || mongoose.model("Order", OrderSchema);

//   const ExtraPriceSchema = new Schema({
//     name: String,
//     price: Number,
//   });

//   const MenuItemSchema = new Schema({
//     image: {type: String},
//     name: {type: String},
//     description: {type: String},
//     category: {type: mongoose.Types.ObjectId},
//     basePrice: {type: Number},
//     sizes: {type:[ExtraPriceSchema]},
//     extraIngredientPrices: {type:[ExtraPriceSchema]},
//   }, {timestamps: true});

//   export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
