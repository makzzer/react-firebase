import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

console.log(import.meta.env.VITE_FIREBASE_API_KEY,)


//esta es la mejor forma de hacer para deploydear en produccion
//ocultando las keys en un file separado
//pero para netlify voy a eliminar esto y lo voy a poner directo para deploydear bien
/*const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};*/


const firebaseConfig = {
    apiKey: "AIzaSyDvotHxDyjnacYecHWYE66T-4fhrtZPd_c",
    authDomain: "udemy-react-2023-80f11.firebaseapp.com",
    projectId: "udemy-react-2023-80f11",
    storageBucket: "udemy-react-2023-80f11.appspot.com",
    messagingSenderId: "668975970932",
    appId: "1:668975970932:web:1e985d252f5cd19a7c2f21",
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

//devuelve una promesa
export const logout = () =>{
    return signOut(auth)
}