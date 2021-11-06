"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _nodeColorLog = _interopRequireDefault(require("node-color-log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  DB_CONN_STRING
} = process.env;

exports.connect = async () => {
  if (!DB_CONN_STRING) {
    _nodeColorLog.default.error("❗ Database connection string is not provided");

    process.exit(1);
  } // Connecting to the database


  _nodeColorLog.default.debug("Connecting to the database...");

  try {
    await _mongoose.default.connect(DB_CONN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    _nodeColorLog.default.info(`✔ Successfully connected to database on ${_mongoose.default.connection.host}:${_mongoose.default.connection.port}`);
  } catch (e) {
    _nodeColorLog.default.error("Database connection failed. Exiting now...");

    console.log(e);
    process.exit(1);
  }
};