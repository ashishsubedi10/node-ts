import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";

dotenv.config();
connectDB();
const app: Express = express();

//middlewares
app.use(express.json());

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
//server start
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
