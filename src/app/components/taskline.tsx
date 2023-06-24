import {
    Button,
    Flex,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TiTickOutline, TiTrash } from "react-icons/ti";
import { useTasks } from "../providers";
import { UpdateTaskModalBody } from "./updatetaskmodalbody";

export function TaskLine({ task, index }: { task: Task; index: number }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { deleteTask, markTaskCompleted } = useTasks();
    const [currTask, updateCurrentTask] = useState<Task>(task);

    const toast = useToast();
    useEffect(() => {}, []);

    const deleteSelectTask = () => {
        deleteTask(task.taskId);
        toast({
            title: "Task Deleted",
            status: "success",
            duration: 1000,
        });
    };

    const markSelectTaskCompleted = () => {
        markTaskCompleted(task.taskId);
    };
    return (
        <Flex align="center" justify="space-between" marginY=".5rem">
            {task.isComplete == "true" ? (
                <Text flex={1} cursor="pointer" onClick={onOpen} as="s">
                    {task.title}
                </Text>
            ) : (
                <Text
                    flex={1}
                    cursor="pointer"
                    onClick={onOpen}
                    fontWeight="medium"
                >
                    {task.title}
                </Text>
            )}

            <Flex gap=".5rem">
                {task.isComplete == "false" && (
                    <IconButton
                        aria-label="Mark Complete"
                        icon={<TiTickOutline />}
                        onClick={markSelectTaskCompleted}
                    />
                )}
                <IconButton
                    aria-label="Delete Task"
                    isRound={true}
                    icon={<TiTrash />}
                    onClick={deleteSelectTask}
                />
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">Task Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <UpdateTaskModalBody task={task} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
