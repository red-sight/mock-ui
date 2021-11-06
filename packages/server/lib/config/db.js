import mongoose from "mongoose";
import logger from "node-color-log";

const { DB_CONN_STRING } = process.env;

exports.connect = async () => {
  if (!DB_CONN_STRING) {
    logger.error("❗ Database connection string is not provided");
    process.exit(1);
  }

  // Connecting to the database
  logger.debug("Connecting to the database...");

  try {
    await mongoose.connect(DB_CONN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info(
      `✔ Successfully connected to database on ${mongoose.connection.host}:${mongoose.connection.port}`
    );
  } catch (e) {
    logger.error("Database connection failed. Exiting now...");
    console.log(e);
    process.exit(1);
  }
};
