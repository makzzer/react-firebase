import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

console.log(import.meta.env.VITE_FIREBASE_API_KEY,)

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

//este auth me trae toda la configuracion de mi proyecto
export const auth = getAuth(app);

//uso el metodo de firebase signInWithEmailAndPassword, 
export const login = ({email,password})  =>{
    return signInWithEmailAndPassword(auth,email,password)
}

export const register = ({email,password}) => {
    return createUserWithEmailAndPassword(auth,email,password)


}