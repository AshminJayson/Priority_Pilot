import { Flex, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { TbSubtask } from "react-icons/tb";
import { MdDarkMode, MdLogout, MdSunny } from "react-icons/md";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useAuth } from "../providers";

export function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { user, logIn, logOut } = useAuth();

    const handleAuthentication = () => {
        user ? logOut() : logIn();
    };
    return (
        <Flex justify="space-between">
            <Flex flex="1" align="center" gap="1rem">
                <TbSubtask color="rgb(0,142,204)" size={40} />
                <Text fontWeight="medium" fontSize="3xl">
                    Priority Pilot
                </Text>
            </Flex>
            <Flex flex="1" gap="1rem" justify="end">
                <IconButton
                    aria-label={user ? "Logout User" : "Login User"}
                    onClick={handleAuthentication}
                    icon={!user ? <FaGoogle /> : <MdLogout />}
                />
                <IconButton
                    aria-label="Open github profile"
                    onClick={() => {
                        window.open("https://www.github.com/AshminJayson");
                    }}
                    icon={<FaGithub />}
                />
                <IconButton
                    aria-label="Toggle color mode"
                    onClick={() => toggleColorMode()}
                    icon={colorMode === "dark" ? <MdDarkMode /> : <MdSunny />}
                />
            </Flex>
        </Flex>
    );
}
