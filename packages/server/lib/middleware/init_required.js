import User from "../models/user";

async function initRequired(req, res, next) {
  const admin = await User.findOne({ role: "admin" });
  const initRequired = !admin;
  if (initRequired) {
    res.send({ initRequired });
    return;
  }
  next();
}

module.exports = {
  initRequired
};
