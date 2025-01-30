import express from 'express';
import dbConnect from './configuration/Db';
import router from './routes/route';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// Allow requests from your frontend origin

const corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));

//connect db
dbConnect();

// Test Route
app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//mount routes
app.use('/api', router);
