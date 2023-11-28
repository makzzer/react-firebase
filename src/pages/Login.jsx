import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import { Link,useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Avatar, Typography, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/user-not-found") {
        //acá tomo lo que me devulve firebase y lo convierto en un error que muestre Yup
        return setErrors({ email: "Usuario no registrado" });
      }
      if (error.code === "auth/wrong-password") {
        return setErrors({ password: "Contraseña incorrecta" });
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

  //En el return llamo a Formik
  //Le voy a dar estilos al formulario con MaterialUI
  return (
    <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
        <AccountCircleIcon />
      </Avatar>

      <Typography variant="h5" component="h1">
        Login
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {
          //necesito retornar dentro de este componente , mi componente de formulario con parametros propios de Formik como values, handleSumbmit,onChange
          //uso el onBlur para que detecte el error antes que el usuario le de a enviar el formulario, osea le de al submit
          ({
            values,
            handleSubmit,
            handleChange,
            errors,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            //si uso component="form" con ese prop components es el elemento que voy a renderizar al final en el HTML
            <Box onSubmit={handleSubmit} sx={{ mt: "8px" }} component="form">
              <TextField
                type="text"
                placeholder="makz@example.com"
                value={values.email}
                onChange={handleChange}
                name="email"
                onBlur={handleBlur}
                id="email"
                label="Ingresa tu mail perri"
                fullWidth
                sx={{ mb: 3, mx: "auto" }}
                error={errors.email && touched.email}
                helperText={errors.email}
              ></TextField>

              <TextField
                type="password"
                placeholder="Ingrese Contraseña"
                value={values.password}
                onChange={handleChange}
                name="password"
                onBlur={handleBlur}
                id="password"
                label="Ingresa la contraseña perri"
                fullWidth
                sx={{ mb: 3, mx: "auto" }}
                error={errors.password && touched.password}
                helperText={errors.password}
              ></TextField>

              <LoadingButton
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                fullWidth
                sx={{ mb: 3 }}
                variant="contained"
              >
                Login
              </LoadingButton>

              <Button
              fullWidth
              component={Link}
              to="/register"
              
              
              >¿No tenes cuenta? Registrate</Button>
            </Box>
          )
        }
      </Formik>
    </Box>
  );
};

export default Login;
