import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //importo el navigate para redirigir
  const navigate = useNavigate();

  //importo el hook que hice yo
  const { user } = useUserContext();

  console.log(user);
  //hago un useEffect para redirigir al usuario al dash
  useRedirectActiveUser(user, "/dashboard");

  //cuando uso esto dentro del componente Formik, ya no llamo a este metodo sino a algo dentro de Formik que cumple esa funcion
  /* const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //le mando a esta funcion login, esto devuelve una promesa
      const credentialUser = await login({ email, password });
      console.log(credentialUser);
      console.log("usuario loguado correctamente");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };*/

  //tengo que construir una nueva funcion para procesar el formulario un onSubmit cuando procese "enviar" que funcione con Formik
  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      //le mando a esta funcion login, esto devuelve una promesa
      const credentialUser = await login({ email, password });
      console.log(credentialUser);
      console.log("usuario loguado correctamente");
      resetForm()
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/user-not-found") { //acá tomo lo que me devulve firebase y lo convierto en un error que muestre Yup
        return setErrors({ email: "Usuario no registrado" });
      }
      if (error.code === "auth/wrong-password"){
        return setErrors({password: "Contraseña incorrecta"})
      }

    } finally {
      //osea cada vez que procese el formulario pasa a verdadero, y caundo firebase devuelve la respuesta lo vuelve a poner en false
      setSubmitting(false);
    }
  };

  //utilizo YUP para las validaciones, yup funciona creando esquemas y usando metodos de Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no valido").required("Email requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Minimo 6 caracteres por regla Firebase")
      .required("Password requerida"),
  });

  //en el return llamo a Formik
  return (
    <>
      <h1>Login</h1>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {
          //necesito retornar dentro de este componente , mi componente de formulario con parametros propios de Formik como values, handleSumbmit,onChange
          //uso el onBlur para que detecte el error antes que el usuario le de a enviar el formulario, osea el submit
          ({
            values,
            handleSubmit,
            handleChange,
            errors,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ingrese email"
                value={values.email}
                onChange={handleChange}
                name="email"
                onBlur={handleBlur}
                //el atributo name tiene que coincidir con el nombre de las propiedaes que pongo en initialValues arriba
              />
              {
                //esto lo voy a usar para mostrar el mensaje de error en el campo, touched.password es cuando esta posicionado sobre el campo, el errors.email es el que defino en Yup caundo hago el esquema
                errors.email && touched.email && errors.email
              }

              <input
                type="password"
                placeholder="Ingrese Contraseña"
                value={values.password}
                onChange={handleChange}
                name="password"
                onBlur={handleBlur}
              />
              {
                //esto lo voy a usar para mostrar el mensaje de error en el campo, touched.password es cuando esta posicionado sobre el campo, el errors.password es el que defino en Yup caundo hago el esquema
                errors.password && touched.password && errors.password
              }

              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </form>
          )
        }
      </Formik>
    </>
  );
};

export default Login;
