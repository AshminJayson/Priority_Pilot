import {
    DocumentData,
    addDoc,
    collection,
    deleteDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { TasksContext } from "../contexts";
import { firestore } from "../dependencies";
import { useAuth } from "./authprovider";

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const { user } = useAuth();

    const addTask = async (newTask: Task): Promise<boolean> => {
        if (!user) return Promise.resolve(false);

        const userCollection = collection(firestore, user.uid);
        newTask.taskId = Date.now() + Math.random();
        const docRef = await addDoc(userCollection, newTask);
        setTasks((tasks: Task[]) => [...tasks, newTask]);
        return Promise.resolve(true);
    };

    const retrieveTasks = async () => {
        setTasks([]);
        if (!user) return;
        const userCollection = collection(firestore, user.uid);
        const querySnapshot = await getDocs(userCollection);
        querySnapshot.docs.map((doc: DocumentData) => {
            console.log(doc.data());
            setTasks((tasks: Task[]) => [...tasks, doc.data()]);
        });
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

    const markTaskCompleted = async (taskId: number) => {
        if (!user) return Promise.resolve(false);

        const userCollection = collection(firestore, user.uid);
        const updateQuery = query(
            userCollection,
            where("taskId", "==", taskId)
        );

        const docRef = await getDocs(updateQuery);
        docRef.forEach((doc) => {
            updateDoc(doc.ref, { isComplete: "true" });
        });

        setTasks((tasks: Task[]) =>
            tasks.map((task) =>
                task.taskId === taskId ? { ...task, isComplete: "true" } : task
            )
        );

        return Promise.resolve(true);
    };

    const updateTask = async (taskId: number, updatedTask: Task) => {
        if (!user) return Promise.resolve(false);

        const userCollection = collection(firestore, user.uid);
        const updateQuery = query(
            userCollection,
            where("taskId", "==", taskId)
        );

        const docRef = await getDocs(updateQuery);
        docRef.forEach((doc) => {
            updateDoc(doc.ref, { ...updatedTask });
        });

        setTasks((tasks: Task[]) =>
            tasks.map((task) => (task.taskId === taskId ? updatedTask : task))
        );

        return Promise.resolve(true);
    };
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
