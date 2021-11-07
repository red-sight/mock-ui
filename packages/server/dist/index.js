"use strict";

var _express = _interopRequireDefault(require("express"));

var _db = require("./config/db");

var _nodeColorLog = _interopRequireDefault(require("node-color-log"));

var _init_required = require("./middleware/init_required");

var _auth = require("./middleware/auth");

var _user = _interopRequireDefault(require("./routes/user"));

var _collection = _interopRequireDefault(require("./routes/collection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Imports
// Setup
const app = (0, _express.default)();

const router = _express.default.Router();

app.use(_express.default.json()); // Starting the app

(0, _db.connect)();
startServer(); // Routes

router.get("/init", _init_required.initRequired, (req, res) => res.send({
  initRequired: false
}));
router.post("/signin", _init_required.initRequired, _user.default.signIn);
router.post("/signup", _user.default.signUp);
router.get("/profile", _auth.auth, (req, res) => {
  res.send({
    profile: req.user
  });
});
router.get("/collections", _auth.auth, _collection.default.getAll);
router.get("/collection/:id", _auth.auth, _collection.default.getMocks);
app.use("/", router); // Functions

function startServer() {
  _nodeColorLog.default.debug("Starting web server..");

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    _nodeColorLog.default.info(`Example app listening at http://localhost:${port}`);
  });
}

module.exports = app;