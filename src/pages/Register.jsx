import { useState } from "react";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";

import { Box, Avatar, Typography, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //me traigo el estado del usuariodesde el context que hice
  const { user } = useUserContext();

  //llamo al hook que hice para redirigirlo a la ruta protegida o fuera de ella
  useRedirectActiveUser(user, "/dashboard");

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const credentialUser2 = await register({ email, password });
      console.log(credentialUser2);
      console.log("usuario creado correctamente");
      resetForm()
    } catch (error) {
      console.log(error.code);
      console.log(error.message);

      //captura de errores desde Firebase
      if (error.code === "auth/email-already-in-use") {
        return setErrors({ email: "El mail ingresado ya existe" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  //acá voy a armar la validacion de campos de YUP

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no valido").required("Email requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Minimo 6 caracteres")
      .required("Password requerida"),
  });

  return (
    <Box sx={{ mt: 8, maxWidth: "400px", textAlign: "center", mx: "auto" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
        <AddAPhotoIcon />
      </Avatar>

      <Typography variant="h5" component="h1">
        Register
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <Box onSubmit={handleSubmit} sx={{ mt: "8px" }} component="form">
            <TextField
              type="text"
              placeholder="test@test.com"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
              id="email"
              label="Ingrese el mail"
              fullWidth
              sx={{ mx: "auto", mb: 3 }}
              error={errors.email && touched.email}
              helperText={errors.email}
            ></TextField>

            <TextField
              type="password"
              placeholder="123123"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              id="password"
              label="Ingrese password"
              fullWidth
              sx={{ mx: "auto", mb: 3 }}
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
              Registrar usuario
            </LoadingButton>
            <Button fullWidth component={Link} to="/">
              Iniciar Sesión
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
