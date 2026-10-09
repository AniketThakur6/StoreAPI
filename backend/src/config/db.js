import mongoose from "mongoose";
import config from "./config.js";

let connectionPromise;

async function connectToDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(config.MONGO_URI)
      .then(() => {
        console.log("Successfully DB is connected");
      })
      .finally(() => {
        connectionPromise = undefined;
      });
  }

  await connectionPromise;
}

export default connectToDB;
