import "dotenv/config";
import cors from "cors";
import express from "express";
import tasksRouter from "./routers/tasks";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "",
        methods: ["GET", "POST", "OPTIONS"],
    }),
);

app.use(express.json());

app.use("/api/tasks", tasksRouter);

app.get("/health-check", (_req, res) => {
    res.status(200).send("OK");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
