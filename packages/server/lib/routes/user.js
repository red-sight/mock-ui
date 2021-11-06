import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "node-color-log";
import User from "../models/user";

async function signIn(req, res) {
  if (!req.body.password || !req.body.login) {
    res.status(400).send({ success: false });
    return;
  }

  const user = await User.findOne({
    login: req.body.login
  });
  const compare = await bcrypt.compare(req.body.password, user.password);
  if (!user || !compare) {
    res.status(401).send({ success: false });
    return;
  }

  if (!process.env.JWT_SECRET)
    logger.warn("JWT secret is not found in env vars");
  const secret = process.env.JWT_SECRET || "shhhhhhhhh";
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      login: user.login
    },
    secret
  );
  res.send({ token });
}

async function signUp(req, res) {
  const admin = await User.findOne({ role: "admin" });
  if (!!admin) {
    res.status(401).send({ success: false });
    return;
  }

  const password = await _hash(req.body.password);

  await User.create({
    login: req.body.login,
    password,
    role: "admin"
  });

  res.send({ success: true });
}

function getProfile(req, res) {}

async function _hash(word) {
  return await bcrypt.hash(word, 10);
}

module.exports = {
  signIn,
  signUp,
  getProfile
};
