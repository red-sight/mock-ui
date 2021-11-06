"use strict";

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function initRequired(req, res, next) {
  const admin = await _user.default.findOne({
    role: "admin"
  });
  const initRequired = !admin;

  if (initRequired) {
    res.send({
      initRequired
    });
    return;
  }

  next();
}

module.exports = {
  initRequired
};