import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
    min: 3,
    max: 24,
    trim: true
  },

  password: {
    type: String,
    required: true,
    min: 6,
    max: 24,
    trim: true
  },

  role: {
    type: String,
    enum: ["admin", "editor"],
    default: "editor"
  }
});

export default mongoose.model("User", schema);
