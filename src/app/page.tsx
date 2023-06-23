"use client";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useAuth, useTasks } from "./providers";
import { useEffect } from "react";
import { AddTaskModalBody, TaskLine } from "./components";

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
                        return (
                            <TaskLine key={index} task={task} index={index} />
                        );
                })}
            </CardBody>
        </Card>
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
                        <AddTaskModalBody />
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
