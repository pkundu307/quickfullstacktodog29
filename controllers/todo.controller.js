import Todo from "../models/todo.schema.js";
import mongoose from "mongoose";

export const createTodo = async (req, res) => {
    try {
        const {title,description,dueDate} =  req.body;
        const userId = req.user.id;

        const newTodo = new Todo({
            user:new mongoose.Types.ObjectId(userId),
            title,
            description,
            dueDate:dueDate ? new Date(dueDate) : null
        });
        await newTodo.save();

        res.status(201).json({ message: "Todo created successfully", todo: newTodo });
    } catch (error) {
        console.error("Create Todo error:", error);
        res.status(500).json({ message: "Server error during todo creation" });
    }
}
export const getAllTodos = async (req, res) => {
    try {
        const userId = req.user.id;
        const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ todos });

        
    } catch (error) {
        console.error("Get Todos error:", error);
        res.status(500).json({ message: "Server error during fetching todos" });
    }
}

export const updateTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const userId = req.user.id;

        const todo = await Todo.findOne({ _id: id, user: userId });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (completed !== undefined) todo.completed = completed;
        await todo.save();

        res.status(200).json({ todo });
    } catch (error) {
        console.error("Update Todo error:", error);
        res.status(500).json({ message: "Server error during todo update" });
    }
}

export const deleteTodoById = async (req, res) => {
    try {
        const {id}=req.params;
        const userId = req.user.id;
        const todo = await Todo.findOneAndDelete({ _id: id, user: userId });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }
        
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Delete Todo error:", error); 
        res.status(500).json({ message: "Server error during todo deletion" });
    }
}