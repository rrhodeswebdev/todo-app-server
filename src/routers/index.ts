import tasksRouter from "./tasks";

export const appRouter = {
    ...tasksRouter,
};
export type AppRouter = typeof appRouter;
