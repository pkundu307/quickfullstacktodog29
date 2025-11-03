import { createTodo } from "../controllers/todo.controller.js";
import express from "express";
import { protect } from "../utilities/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createTodo);

export default router;