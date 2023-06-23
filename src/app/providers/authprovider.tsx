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
        firebaseAuth.onAuthStateChanged((savedUser) => {
            if (savedUser) {
                setUser({
                    userName: savedUser.displayName!,
                    email: savedUser.email!,
                    uid: savedUser.uid!,
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
                        uid: res.user.uid!,
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
