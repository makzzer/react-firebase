import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

//config de Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(false);

  //hago un use effect para controlar el estado del context
  //quiero saber si el usuario ya existe o tiene la cuenta activa en mi aplicacion, y eso lo voy a sacar de firebase
  useEffect(() => {
    console.log("use effect en accion");

    //le agrego una pequeña validacion para que no se ejecute mas de una vez este metodo
    //onAuthStateChanged no devuelve una promesa, de alguna forma tengo que hacer que la devuelva
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      //al user le seteo lo que me devuelva el metodo de firebase onAuthStateChanged, puede devolver el objeto usuario o null
      //por lo que voy a tener en user 3 estados, el False incial, el objeto de la cuenta (si eso existe podemos ingresar a la ruta protegida) o null
      setUser(user);
    });
    //si tengo un metodo que destruya el metodo use effect activo el unsuscribe y retorno, es la misma validacion de seguridad de arriba
    return unsuscribe;
  }),[];

  //pequeña validacion de usuario con false, null o el objeto que venga del useEffect
  if (user == false){
    return(
        <h1>Loading App...</h1>
    )
  }






    return (
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);
