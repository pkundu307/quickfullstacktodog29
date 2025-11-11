// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import authRoutes from './routes/auth.route.js';
// import todoRoutes from './routes/todo.route.js';
// import dotenv from 'dotenv';
// import path from 'path';
// import http from "http"
// import { fileURLToPath } from 'url';
// import {Server} from 'socket.io'

// dotenv.config();

// const app = express();
// const server = http.createServer(app)
// //io configuration
// const io= new Server(server,{
//   cors:{
//     origin:"*",
//     method:["GET","POST"]
//   }
// })


// io.on("connection",(socket)=>{
//   console.log("🟢user Connected",socket.id)

// socket.on("send_message",(data)=>{
//   console.log(data)
//   //this line is for sending a message to the other user
//   socket.emit("receive_message",data)
// })
// socket.on("disconnected",()=>{
//   console.log("user disconnected");
  
// })
// })


// app.get("/",(req,res)=>{
//   res.send("websocker + express server running")
// })


// app.use(cors(
 
// ));// Enable CORS for all routes cross origin resource sharing
// app.use(bodyParser.json());
// app.use('/api/auth', authRoutes);
// app.use('/api/todos', todoRoutes);

// app.use(express.json());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Path to your dist folder after Vite build
// const distPath = path.join(__dirname, './dist');

// // Serve Static Files (after building with Vite)
// app.use(express.static(distPath));

// // For all other routes, serve the index.html (for frontend routing)
// app.use((req, res) => {
//   res.sendFile(path.join(distPath, 'index.html'));
// });


// mongoose.connect(process.env.mongoUrl).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((error) => {
//     console.error('MongoDB connection error:', error);
// });
// app.listen(process.env.PORT, () => {
//     console.log(`app is running on port localhost:${process.env.PORT}`);
// });
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // for demo
    methods: ["GET", "POST"]
  }
});

// Basic REST API
app.get("/", (req, res) => {
  res.send("WebSocket + Express server running 🚀");
});

// WebSocket logic
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Message:", data);
    io.emit("receive_message", data); // broadcast to everyone
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
