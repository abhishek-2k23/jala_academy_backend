import express from 'express';
import dbConnect from './configuration/Db';
import router from './routes/route';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

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
