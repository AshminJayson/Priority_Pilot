import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../contexts";
import { firestore } from "../dependencies";
import { useAuth } from "./authprovider";
import { getDocs, collection, addDoc } from "firebase/firestore";

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<any>([]);

    const { user } = useAuth();

    const addTask = async (newTask: any) => {
        if (!user) return;
        const userCollection = collection(firestore, user.uid);
        console.log(newTask);
        await addDoc(userCollection, newTask).then((doc) => console.log(doc));
    };
    const deleteTask = async () => {};
    const updateTask = async () => {};
    const retrieveTasks = async () => {
        if (!user) return;
        const userCollection = collection(firestore, user.uid);
        const querySnapshot = await getDocs(userCollection);
        querySnapshot.docs.map((doc: any) => {
            setTasks((tasks: any) => [...tasks, doc.data()]);
        });
    };

    return (
        <TasksContext.Provider
            value={{ tasks, addTask, deleteTask, updateTask, retrieveTasks }}
        >
            {children}
        </TasksContext.Provider>
    );
}

export const useTasks = () => useContext(TasksContext);
