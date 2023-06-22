import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts";
import {
    setPersistence,
    browserSessionPersistence,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";
import { firebaseAuth } from "../dependencies";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                setUser({
                    userName: user.displayName!,
                    email: user.email!,
                });
            }
        });
    }, []);

    const logIn = async () => {
        setPersistence(firebaseAuth, browserSessionPersistence).then(() => {
            signInWithPopup(firebaseAuth, new GoogleAuthProvider()).then(
                (res) => {
                    setUser({
                        userName: res.user.displayName!,
                        email: res.user.email!,
                    });
                }
            );
        });
    };

    const logOut = async () => {
        signOut(firebaseAuth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
