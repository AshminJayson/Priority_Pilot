import {
    Button,
    Flex,
    Input,
    Select,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";
import { useTasks } from "../providers";

export function AddTaskModalBody() {
    const toast = useToast();

    const [newTask, setNewTask] = useState<Task>({
        taskId: Date.now() + Math.random(),
        title: "",
        description: "",
        dueDate: new Date(),
        importance: 0,
        urgency: 0,
    });
    const { addTask } = useTasks();

    const [loading, setLoading] = useState<boolean>(false);
    const handleChange = (
        event:
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLTextAreaElement>
            | ChangeEvent<HTMLSelectElement>
    ) => {
        setNewTask({ ...newTask, [event.target.name]: event.target.value! });
    };

    const addNewTask = () => {
        setLoading(true);
        addTask(newTask).then((res) => {
            if (res) {
                toast({
                    title: "Task added successfully",
                    status: "success",
                    duration: 1000,
                });
            } else {
                toast({
                    title: "Task addition failed",
                    status: "error",
                    duration: 1000,
                });
            }
            setLoading(false);
        });
    };

    return (
        <Flex direction="column" gap="0.75rem">
            <Input
                name="title"
                onChange={handleChange}
                placeholder="Task Title"
            ></Input>
            <Textarea
                name="description"
                onChange={handleChange}
                placeholder="Description"
            ></Textarea>
            <Input
                name="dueDate"
                placeholder="Select Date and Time"
                type="datetime-local"
                onChange={handleChange}
            ></Input>
            <Select
                name="importance"
                onChange={handleChange}
                placeholder="Select Importance"
            >
                <option value={3}>Important : High</option>
                <option value={2}>Important : Medium</option>
                <option value={1}>Important : Low</option>
                <option value={0}>Not Important</option>
            </Select>
            <Select
                name="urgency"
                onChange={handleChange}
                placeholder="Select Urgency"
            >
                <option value={3}>Urgent : High</option>
                <option value={2}>Urgent : Medium</option>
                <option value={1}>Urgent : Low</option>
                <option value={0}>Not Urgent</option>
            </Select>
            <Button isLoading={loading} onClick={addNewTask}>
                Add Task
            </Button>
        </Flex>
    );
}
