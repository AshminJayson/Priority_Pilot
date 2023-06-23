import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../contexts";
import { firestore } from "../dependencies";
import { useAuth } from "./authprovider";
import { getDocs, collection, addDoc, DocumentData } from "firebase/firestore";

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const { user } = useAuth();

    const addTask = async (newTask: Task): Promise<boolean> => {
        if (!user) return Promise.resolve(false);

        const userCollection = collection(firestore, user.uid);
        console.log(newTask);
        const docRef = await addDoc(userCollection, newTask);
        setTasks((tasks: Task[]) => [...tasks, newTask]);
        return Promise.resolve(true);
    };

    const deleteTask = async () => {};
    const updateTask = async () => {};
    const retrieveTasks = async () => {
        setTasks([]);
        if (!user) return;
        const userCollection = collection(firestore, user.uid);
        const querySnapshot = await getDocs(userCollection);
        querySnapshot.docs.map((doc: DocumentData) => {
            setTasks((tasks: Task[]) => [...tasks, doc.data()]);
            console.log(tasks);
        });
    };

    const markTaskCompleted = async () => {};

    return (
        <TasksContext.Provider
            value={{
                tasks,
                addTask,
                deleteTask,
                updateTask,
                retrieveTasks,
                markTaskCompleted,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
}

export const useTasks = () => useContext(TasksContext);
