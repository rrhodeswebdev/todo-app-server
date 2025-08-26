import express from "express";
import { PrismaClient } from "../../prisma/generated/client.js";

const router = express.Router();
const prisma = new PrismaClient();

// GET all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json({
            data: tasks,
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to fetch tasks",
        });
    }
});

// POST a task
router.post("/", async (req, res) => {
    try {
        const { title } = req.body;

        const task = await prisma.task.create({
            data: {
                title,
            },
        });

        res.status(201).json({
            data: task,
        });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to create task",
        });
    }
});

// PUT a task
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, color } = req.body;

        const task = await prisma.task.update({
            where: {
                id,
            },
            data: {
                title,
                color,
                updatedAt: new Date(),
            },
        });

        res.status(200).json({
            data: task,
        });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to update task",
        });
    }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.task.delete({
            where: {
                id,
            },
        });

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to delete task",
        });
    }
});

export default router;
