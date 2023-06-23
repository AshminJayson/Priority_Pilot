import { createContext } from "react";

interface TasksContextProps {
    tasks: Array<Task>;
    addTask: (newTask: Task) => Promise<boolean>;
    deleteTask: () => void;
    updateTask: () => void;
    markTaskCompleted: () => void;
    retrieveTasks: () => void;
}

export const TasksContext = createContext<TasksContextProps>({
    tasks: [],
    addTask: function (newTask: Task): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
    deleteTask: function (): void {
        throw new Error("Function not implemented.");
    },
    updateTask: function (): void {
        throw new Error("Function not implemented.");
    },
    retrieveTasks: function (): void {
        throw new Error("Function not implemented.");
    },
    markTaskCompleted: function (): void {
        throw new Error("Function not implemented.");
    },
});
