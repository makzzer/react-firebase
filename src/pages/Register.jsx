import { useState } from "react";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //me traigo el estado del usuariodesde el context que hice
  const {user} = useUserContext()

  //llamo al hook que hice para redirigirlo a la ruta protegida o fuera de ella
  useRedirectActiveUser(user,"/dashboard")

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("entre al registrar usuario nuevo");

    try {
      //le mando a esta funcion login, esto devuelve una promesa
      const credentialUser2 = await register({ email, password });
      console.log(credentialUser2);
      console.log("usuario creado correctamente");

    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
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
        <button>Registrar usuario</button>
      </form>
    </>
  );
};

export default Register;
