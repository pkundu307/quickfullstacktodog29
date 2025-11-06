import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import todoRoutes from './routes/todo.route.js';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(cors(
 { origin: 'http://localhost:5174' }
));// Enable CORS for all routes cross origin resource sharing
server.use(bodyParser.json());
server.use('/api/auth', authRoutes);
server.use('/api/todos', todoRoutes);

mongoose.connect('mongodb://localhost:27017/todoapp').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port localhost:${process.env.PORT}`);
});
