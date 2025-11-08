import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import todoRoutes from './routes/todo.route.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const server = express();

server.use(cors(
 
));// Enable CORS for all routes cross origin resource sharing
server.use(bodyParser.json());
server.use('/api/auth', authRoutes);
server.use('/api/todos', todoRoutes);

server.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your dist folder after Vite build
const distPath = path.join(__dirname, './dist');

// Serve Static Files (after building with Vite)
server.use(express.static(distPath));

// For all other routes, serve the index.html (for frontend routing)
server.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});


mongoose.connect(process.env.mongoUrl).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port localhost:${process.env.PORT}`);
});
