import app from "../src/app/app.js";
import connectToDB from "../src/config/db.js";

export default async function handler(req, res) {
  await connectToDB();
  return app(req, res);
}
