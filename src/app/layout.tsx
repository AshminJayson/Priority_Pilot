"use client";

import { Orbitron } from "next/font/google";
import { AuthProvider, ChakraUIProvider, TasksProvider } from "./providers";
import { Navbar } from "./components";
import { Flex } from "@chakra-ui/react";

const orbitron = Orbitron({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={orbitron.className}>
                <ChakraUIProvider>
                    <AuthProvider>
                        <Flex
                            padding="2rem"
                            flexDirection="column"
                            height="100vh"
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
                            <Navbar />
                            <TasksProvider>{children}</TasksProvider>
                        </Flex>
                    </AuthProvider>
                </ChakraUIProvider>
            </body>
        </html>
    );
}
