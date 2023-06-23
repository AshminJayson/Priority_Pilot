import { Flex, IconButton, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { TiTickOutline, TiTrash } from "react-icons/ti";
import { useTasks } from "../providers";

export function TaskLine({ task, index }: { task: Task; index: number }) {
    const { deleteTask } = useTasks();
    const toast = useToast();
    useEffect(() => {
        console.log(task.dueDate);
    }, []);

    const deleteSelectTask = () => {
        deleteTask(task.taskId);
        toast({
            title: "Task Deleted",
            status: "success",
            duration: 1000,
        });
    };
    return (
        <Flex
            align="center"
            justify="space-between"
            marginY=".5rem"
            cursor="pointer"
        >
            <Text fontWeight="medium">{task.title}</Text>
            <Flex gap=".5rem">
                <IconButton
                    aria-label="Mark Complete"
                    icon={<TiTickOutline />}
                ></IconButton>
                <IconButton
                    aria-label="Delete Task"
                    isRound={true}
                    icon={<TiTrash />}
                    onClick={deleteSelectTask}
                ></IconButton>
            </Flex>
        </Flex>
    );
}
