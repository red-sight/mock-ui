// Imports
import express from "express";
import { connect } from "./config/db";
import logger from "node-color-log";
import { initRequired } from "./middleware/init_required";
import { auth } from "./middleware/auth";
import user from "./routes/user";
import collection from "./routes/collection";

// Setup
const app = express();
const router = express.Router();
app.use(express.json());

// Starting the app
connect();
startServer();

// Routes
router.get("/init", initRequired, (req, res) =>
  res.send({ initRequired: false })
);
router.post("/signin", initRequired, user.signIn);
router.post("/signup", user.signUp);
router.get("/profile", auth, (req, res) => {
  res.send({
    profile: req.user
  });
});
router.get("/collections", auth, collection.getAll);
router.get("/collection/:id", auth, collection.getMocks);
app.use("/", router);

// Functions
function startServer() {
  logger.debug("Starting web server..");
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`Example app listening at http://localhost:${port}`);
  });
}

module.exports = app;
