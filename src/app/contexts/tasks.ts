import { createContext } from "react";

interface TasksContextProps {
    tasks: Array<Task>;
    addTask: (newTask: Task) => Promise<boolean>;
    deleteTask: (taskId: number) => void;
    updateTask: (taskId: number) => void;
    markTaskCompleted: (taskId: number) => void;
    retrieveTasks: () => void;
}

export const TasksContext = createContext<TasksContextProps>({
    tasks: [],
    addTask: function (newTask: Task): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
    deleteTask: function (taskId: number): void {
        throw new Error("Function not implemented.");
    },
    updateTask: function (taskId: number): void {
        throw new Error("Function not implemented.");
    },
    markTaskCompleted: function (taskId: number): void {
        throw new Error("Function not implemented.");
    },
    retrieveTasks: function (): void {
        throw new Error("Function not implemented.");
    },
});
