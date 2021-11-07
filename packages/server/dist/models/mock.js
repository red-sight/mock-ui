"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
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
      enum: ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "DELETE", "TRACE", "PATCH"],
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

var _default = _mongoose.default.model("Mock", schema);

exports.default = _default;