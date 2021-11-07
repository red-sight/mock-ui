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

var _default = _mongoose.default.model("Collection", schema);

exports.default = _default;