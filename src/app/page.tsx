"use client";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    SimpleGrid,
    Text,
    Textarea,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useAuth, useTasks } from "./providers";
import { ChangeEvent, useEffect, useState } from "react";
import { TaskLine } from "./components";

function MatrixCard({ bg, type }: { bg: string; type: string }) {
    const { tasks } = useTasks();

    const ruleCheck = (urgency: number, importance: number, type: string) => {
        switch (type) {
            case "DO":
                if (urgency > 0 && importance > 0) return true;
                break;
            case "SCHEDULE":
                if (urgency == 0 && importance > 0) return true;
                break;
            case "DELEGATE":
                if (urgency > 0 && importance == 0) return true;
                break;
            case "DELETE":
                if (urgency == 0 && importance == 0) return true;
                break;
        }

        console.log(urgency, importance, type);
        return false;
    };
    return (
        <Card height="250px" backgroundColor={bg}>
            <CardHeader paddingBottom={0}>
                <Heading size="md">{type}</Heading>
            </CardHeader>
            <CardBody
                overflow="scroll"
                sx={{
                    "::-webkit-scrollbar": {
                        display: "none",
                    },
                    "&": {
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                    },
                }}
            >
                {tasks.map((task, index) => {
                    if (ruleCheck(task.urgency, task.importance, type))
                        return <TaskLine key={index} task={task} />;
                })}
            </CardBody>
        </Card>
    );
}

function AddTask() {
    const toast = useToast();

    const [newTask, setNewTask] = useState<Task>({
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

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, logIn } = useAuth();
    const { retrieveTasks } = useTasks();

    useEffect(() => {
        retrieveTasks();
    }, [user]);
    return (
        <Flex
            direction="column"
            width="100%"
            my="1.25rem"
            alignSelf="center"
            gap="1rem"
        >
            <Flex
                direction={{ base: "column", md: "row" }}
                justify={{ base: "center", md: "space-between" }}
                align="center"
                gap="1rem"
            >
                <Text
                    textAlign="center"
                    fontWeight="medium"
                    fontStyle="italic"
                    onClick={logIn}
                    cursor="pointer"
                >
                    {!user ? "> Login to add and delegate tasks" : " "}
                </Text>
                <Button
                    aria-label="Add new task"
                    onClick={onOpen}
                    isDisabled={user == null}
                >
                    Add New Task
                </Button>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">Add New Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AddTask />
                    </ModalBody>
                </ModalContent>
            </Modal>

            <SimpleGrid flex={1} columns={{ sm: 1, md: 2 }} spacing={15}>
                <MatrixCard bg="rgb(85, 206, 138)" type="DO" />
                <MatrixCard bg="rgb(227, 195, 17)" type="SCHEDULE" />
                <MatrixCard bg="rgb(58, 137, 162)" type="DELEGATE" />
                <MatrixCard bg="rgb(193, 51, 0)" type="DELETE" />
            </SimpleGrid>
        </Flex>
    );
}
