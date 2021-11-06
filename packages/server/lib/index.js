// Imports
import express from "express";
import { connect } from "./config/db";
import logger from "node-color-log";
import user from "./routes/user";
import { initRequired } from "./middleware/init_required";

// Setup
const app = express();
const router = express.Router();
app.use(express.json());

console.log("Starting");

// Starting the app
connect();
startServer();

// Routes
router.get("/init", initRequired, (req, res) => res.send({ success: true }));
router.post("/signin", initRequired, user.signIn);
router.post("/signup", user.signUp);
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
