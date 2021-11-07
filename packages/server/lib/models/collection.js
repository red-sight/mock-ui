import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 16,
    trim: true
  },

  desc: {
    type: String,
    max: 1024,
    trim: true
  },

  baseURL: {
    type: String,
    required: true,
    min: 3,
    max: 124,
    trim: true
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

export default mongoose.model("Collection", schema);
