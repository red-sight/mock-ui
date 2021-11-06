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

var _default = _mongoose.default.model("User", schema);

exports.default = _default;