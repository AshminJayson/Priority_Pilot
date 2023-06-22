import { createContext } from "react";

interface AuthContextProps {
    user: User | null;
    logIn: () => void;
    logOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    logIn: () => {},
    logOut: () => {},
});
