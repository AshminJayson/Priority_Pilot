"use client";

import { Badge, Card, CardHeader, Heading, SimpleGrid } from "@chakra-ui/react";
import { useAuth } from "./providers";

export default function Home() {
    const { user } = useAuth();
    return (
        <SimpleGrid
            flex={1}
            columns={2}
            spacing={15}
            padding="2rem"
            justifySelf="center"
        >
            <Card height="250px" backgroundColor="rgb(85, 206, 138)">
                <CardHeader>
                    <Heading size="md">DO</Heading>
                </CardHeader>
            </Card>
            <Card height="250px" backgroundColor="rgb(227, 195, 17)">
                <CardHeader>
                    <Heading size="md">SCHEDULE</Heading>
                </CardHeader>
            </Card>
            <Card height="250px" backgroundColor="rgb(58, 137, 162)">
                <CardHeader>
                    <Heading size="md">DELEGATE</Heading>
                </CardHeader>
            </Card>
            <Card height="250px" backgroundColor="rgb(193, 51, 0)">
                <CardHeader>
                    <Heading size="md">DELETE</Heading>
                </CardHeader>
            </Card>
        </SimpleGrid>
    );
}
