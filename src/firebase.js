import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.MESSAGINGSENDERID,
    appId: import.meta.env.APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export let auth = getAuth(app);
export let db = getFirestore(app);  