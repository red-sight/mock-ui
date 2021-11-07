import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
  path: {
    type: String,
    required: true,
    max: 124,
    trim: true
  },

  request: {
    type: {
      type: String,
      enum: [
        "GET",
        "HEAD",
        "POST",
        "PUT",
        "DELETE",
        "CONNECT",
        "OPTIONS",
        "DELETE",
        "TRACE",
        "PATCH"
      ],
      default: "editor"
    },

    body: Schema.Types.Mixed
  },

  response: {
    body: Schema.Types.Mixed,

    code: {
      type: Number,
      required: true,
      default: 200
    }
  },

  desc: {
    type: String,
    max: 1024,
    trim: true
  },

  parentCollection: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

export default mongoose.model("Mock", schema);
