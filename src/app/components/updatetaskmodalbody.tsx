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

export function UpdateTaskModalBody({ task }: { task: Task }) {
    const toast = useToast();

    const [currTask, setCurrentTask] = useState<Task>(task);
    const { updateTask } = useTasks();
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (
        event:
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLTextAreaElement>
            | ChangeEvent<HTMLSelectElement>
    ) => {
        setCurrentTask({
            ...currTask,
            [event.target.name]: event.target.value!,
        });
    };

    const updateSelectTask = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        updateTask(task.taskId, currTask)
            .then((res) => {
                if (res) {
                    toast({
                        status: "success",
                        title: "Task updated",
                        duration: 1000,
                    });
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form onSubmit={updateSelectTask}>
            <Flex direction="column" gap="0.75rem">
                <Input
                    required
                    defaultValue={task.title}
                    name="title"
                    onChange={handleChange}
                    placeholder="Task Title"
                ></Input>
                <Textarea
                    defaultValue={task.description}
                    name="description"
                    onChange={handleChange}
                    placeholder="Description"
                ></Textarea>
                <Input
                    required
                    defaultValue={task.dueDate.toLocaleString()}
                    name="dueDate"
                    placeholder="Select Date and Time"
                    type="datetime-local"
                    onChange={handleChange}
                ></Input>
                <Select
                    defaultValue={task.importance}
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
                    defaultValue={task.urgency}
                    name="urgency"
                    onChange={handleChange}
                    placeholder="Select Urgency"
                >
                    <option value={3}>Urgent : High</option>
                    <option value={2}>Urgent : Medium</option>
                    <option value={1}>Urgent : Low</option>
                    <option value={0}>Not Urgent</option>
                </Select>
                <Button isLoading={loading} type="submit">
                    Update Task
                </Button>
            </Flex>
        </form>
    );
}
