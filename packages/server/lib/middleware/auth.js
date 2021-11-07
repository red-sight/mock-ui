import User from "../models/user";
import jwt from "jsonwebtoken";

async function auth(req, res, next) {
  const token = req.get("token");
  if (!token) {
    res.status(401).send({ error: "Authorization required" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "shhhhhhhhh");
    const now = Math.floor(Date.now() / 1000);
    if (decoded && decoded.exp && decoded.exp >= now && decoded.login) {
      const user = await User.findOne(
        { login: decoded.login },
        "id login role"
      );
      if (!user) throw new Error();
      req.user = user;
      next();
      return;
    }
    throw new Error();
  } catch (err) {
    res.status(401).send({ error: "Authorization failed" });
    return;
  }
}

module.exports = {
  auth
};
