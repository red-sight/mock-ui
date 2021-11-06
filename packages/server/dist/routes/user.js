"use strict";

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _nodeColorLog = _interopRequireDefault(require("node-color-log"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function signIn(req, res) {
  if (!req.body.password || !req.body.login) {
    res.status(400).send({
      success: false
    });
    return;
  }

  const user = await _user.default.findOne({
    login: req.body.login
  });
  const compare = await _bcryptjs.default.compare(req.body.password, user.password);

  if (!user || !compare) {
    res.status(401).send({
      success: false
    });
    return;
  }

  if (!process.env.JWT_SECRET) _nodeColorLog.default.warn("JWT secret is not found in env vars");
  const secret = process.env.JWT_SECRET || "shhhhhhhhh";

  const token = _jsonwebtoken.default.sign({
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    login: user.login
  }, secret);

  res.send({
    token
  });
}

async function signUp(req, res) {
  const admin = await _user.default.findOne({
    role: "admin"
  });

  if (!!admin) {
    res.status(401).send({
      success: false
    });
    return;
  }

  const password = await _hash(req.body.password);
  await _user.default.create({
    login: req.body.login,
    password,
    role: "admin"
  });
  res.send({
    success: true
  });
}

function getProfile(req, res) {}

async function _hash(word) {
  return await _bcryptjs.default.hash(word, 10);
}

module.exports = {
  signIn,
  signUp,
  getProfile
};