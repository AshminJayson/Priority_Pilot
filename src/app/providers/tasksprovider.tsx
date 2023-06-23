import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../contexts";
import { firestore } from "../dependencies";
import { useAuth } from "./authprovider";
import {
    getDocs,
    collection,
    addDoc,
    DocumentData,
    where,
    query,
    deleteDoc,
} from "firebase/firestore";

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const { user } = useAuth();

    const addTask = async (newTask: Task): Promise<boolean> => {
        if (!user) return Promise.resolve(false);

        const userCollection = collection(firestore, user.uid);
        const docRef = await addDoc(userCollection, newTask);
        setTasks((tasks: Task[]) => [...tasks, newTask]);
        return Promise.resolve(true);
    };

    const deleteTask = async (taskId: number) => {
        if (!user) return Promise.resolve(false);

        const userCollection = collection(firestore, user.uid);
        const deleteQuery = query(
            userCollection,
            where("taskId", "==", taskId)
        );
        const docRef = await getDocs(deleteQuery);
        docRef.forEach((doc) => deleteDoc(doc.ref));
        setTasks((tasks: Task[]) =>
            tasks.filter((task) => task.taskId !== taskId)
        );

        return Promise.resolve(true);
    };
    const updateTask = async () => {};
    const retrieveTasks = async () => {
        setTasks([]);
        if (!user) return;
        const userCollection = collection(firestore, user.uid);
        const querySnapshot = await getDocs(userCollection);
        querySnapshot.docs.map((doc: DocumentData) => {
            setTasks((tasks: Task[]) => [...tasks, doc.data()]);
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
