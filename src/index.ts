import express, { Request, Response } from "express";
import dbConnect from "./configuration/Db";
import router from "./routes/Route";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));

// Connect to the database
dbConnect();

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

// Mount routes
app.use("/api", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});