import { Flex, IconButton, Text } from "@chakra-ui/react";
import { TiTickOutline, TiTrash } from "react-icons/ti";

export function TaskLine({ task }: { task: Task }) {
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
                ></IconButton>
            </Flex>
        </Flex>
    );
}
