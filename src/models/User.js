import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "must provide email"],
    },
    email: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true }
);

// UserSchema.post("validate", function (user) {

// });

// export const User = mongoose.model("User", UserSchema);
export const User = mongoose.models?.User || mongoose.model("User", UserSchema);

// const TaskSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "must provide a name"],
//     trim: true,
//     maxlength: [20, "name can not be more than 20 characters"],
//     minlength: [2, "name can not be less than 2 characters"],
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });

// export const Task = mongoose.model("Task", TaskSchema);
