import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import handler from './api/index';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the API endpoint
app.get('/api', async (req, res) => {
  await handler(req, res);
});

// Serve the main HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
