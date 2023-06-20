import { useState } from "react";
import {login} from '../config/firebase'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e)=> {
    e.preventDefault()
    console.log("me diste al submit")

    try {
        //le mando a esta funcion login, esto devuelve una promesa
        const credentialUser = await login({email,password})
        console.log(credentialUser)
        console.log("usuario loguado correctamente")
        
    } catch (error) {
        console.log(error.code)
        console.log(error.message)
        
    }





  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingrese Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button> Login</button>
      </form>
    </>
  );
};

export default Login;
