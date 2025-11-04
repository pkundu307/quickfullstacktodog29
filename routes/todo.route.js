import { createTodo, deleteTodoById, getAllTodos, updateTodoById } from "../controllers/todo.controller.js";
import express from "express";
import { protect } from "../utilities/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createTodo);
router.get("/all", protect, getAllTodos);
router.put("/update/:id", protect, updateTodoById);
router.delete("/delete/:id", protect, deleteTodoById);

export default router;