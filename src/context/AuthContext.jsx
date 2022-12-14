import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import {setDoc, doc} from "firebase/firestore";

let AuthContext = createContext();

export function AuthContextProvider({children}) {

    let [user, setUser] = useState({});

    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, "users", email), {
            savedShows: [],
        });
    };

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    };

    function logOut() {
        return signOut(auth);
    };

    useEffect(() => {
        let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{signUp, logIn, logOut, user, }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext);
}