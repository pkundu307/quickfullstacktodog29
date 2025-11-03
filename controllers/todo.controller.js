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