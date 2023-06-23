"use client";

import {
    Button,
    Card,
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
} from "@chakra-ui/react";
import { useAuth, useTasks } from "./providers";
import { ChangeEvent, useState } from "react";

function MatrixCard({ bg, type }: { bg: string; type: string }) {
    return (
        <Card height="250px" backgroundColor={bg}>
            <CardHeader>
                <Heading size="md">{type}</Heading>
            </CardHeader>
        </Card>
    );
}

function AddTask() {
    const [newTask, setNewTask] = useState<Task>({
        title: "",
        description: "",
        dueDate: new Date(),
        importance: 0,
        urgency: 0,
    });

    const { addTask } = useTasks();

    const handleChange = (
        event:
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLTextAreaElement>
            | ChangeEvent<HTMLSelectElement>
    ) => {
        setNewTask({ ...newTask, [event.target.name]: event.target.value! });
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
                placeholder="Select Date and Time"
                type="datetime-local"
                onChange={handleChange}
            ></Input>
            <Select onChange={handleChange} placeholder="Select Importance">
                <option value={3}>Important : High</option>
                <option value={2}>Important : Medium</option>
                <option value={1}>Important : Low</option>
                <option value={0}>Not Important</option>
            </Select>
            <Select onChange={handleChange} placeholder="Select Urgency">
                <option value={3}>Urgent : High</option>
                <option value={2}>Urgent : Medium</option>
                <option value={1}>Urgent : Low</option>
                <option value={0}>Not Urgent</option>
            </Select>
            <Button onClick={() => addTask(newTask)}>Add Task</Button>
        </Flex>
    );
}

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, logIn } = useAuth();
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
