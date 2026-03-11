import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

// app config
const app = express();
connectDB()
const port = process.env.PORT || 4000;
// middleware
app.use(express.json());
app.use(cors());
// api endpoint
app.get("/", (req, res) => {
  res.send("api is working");
});
// application listner
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/* what server done - server actually user theke data niye database a add kore.
 othoba user data chaile database theke data niye dey */
