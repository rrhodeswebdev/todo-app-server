import express from "express";
import { z } from "zod";
import { PrismaClient } from "../../prisma/generated/client.js";
import { Color } from "../../prisma/generated/enums.js";

const router = express.Router();
const prisma = new PrismaClient();

const colorEnum = z.enum(Color);

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  color: colorEnum.optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  completed: z.boolean().optional(),
  color: colorEnum.optional(),
});

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

// GET a task
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id },
  });
  res.status(200).json({ data: task });
});

// POST a task
router.post("/", async (req, res) => {
  try {
    const validation = createTaskSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: "Validation error",
        details: validation.error.issues,
      });
    }

    const { title, color = Color.BLUE } = validation.data;

    const task = await prisma.task.create({
      data: {
        title,
        color,
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

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        error: "Invalid ID",
        message: "Task ID is required",
      });
    }

    const validation = updateTaskSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: "Validation error",
        details: validation.error.issues,
      });
    }

    const { title, completed, color = Color.BLUE } = validation.data;

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        completed,
        color,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      data: task,
    });
  } catch (error) {
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

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        error: "Invalid Task",
        message: "Task is not found",
      });
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to delete task",
    });
  }
});

export default router;
