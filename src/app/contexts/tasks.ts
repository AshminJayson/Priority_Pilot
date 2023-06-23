import { createContext } from "react";

interface TasksContextProps {
    tasks: Array<any>;
    addTask: (newTask: any) => void;
    deleteTask: () => void;
    updateTask: () => void;
    retrieveTasks: () => void;
}

export const TasksContext = createContext<TasksContextProps>({
    tasks: [],
    addTask: (newTask: any) => {},
    deleteTask: () => {},
    updateTask: () => {},
    retrieveTasks: () => {},
});
