import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
// middleware
app.use(express.json());
app.use(cors());
// api endpoint
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.get("/", (req, res) => {
  res.send("api is working");
});
// application listner
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/* what server done - server actually user theke data niye database a add kore.
 othoba user data chaile database theke data niye dey */
