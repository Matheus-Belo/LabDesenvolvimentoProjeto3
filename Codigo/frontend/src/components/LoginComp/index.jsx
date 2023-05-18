import { Box, Button, TextField, useTheme, Grid, Collapse } from "@mui/material";
import { ColorTokens } from "../../theme";
import { Field, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import * as yup from "yup";
import api from "../../services/API/api";
import Header from "../Header/Header";
import useMediaQuery from "@mui/material/useMediaQuery";


const LoginComp = ( { isLoginOpen, closeLogin } ) => {
    const theme = useTheme();
    const colors = ColorTokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    let navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [authenticated, setauthenticated] = useState(sessionStorage.getItem(sessionStorage.getItem("authenticated")|| false));

    //sessionStorage.clear();

    const handleFormSubmit = async (values) => {
        const LoginInfo = {
            email: values.email,
            password: values.senha,
        }

        //Olhar qual o JSON sendo mandado para o backend
        //console.log(LoginInfo);

        const Info = await api.post("/auth/login", LoginInfo)
        .then(data => data)
        .catch(function (error) {
            console.log(error.toJSON());
            if (!error.response) {
                console.log("No Server Response");
            }else if (error.response.status === 400) {
                console.log("Missing Username or Password");
            } else if (error.response.status === 401) {
                console.log("Unauthorized");
            } else {
                console.log("Login Failed");
            }
        });

        //console.log(Info.data.roles);
        setauthenticated(true)
        sessionStorage.setItem("authenticated", true);
        sessionStorage.setItem("token", Info.data.token);
        sessionStorage.setItem("Role", Info.data.roles);

        window.location.reload(true)
    };

    return (
        <Collapse in={isLoginOpen}>
            <Grid
                sx={{
                    borderRadius: '16px',
                    backgroundColor: "#111",
                    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)",
                }}
            >
                <Box pt="10px">
                    <Header  title="Login" subtitle="Faça o login para poder acessar o sistema" pt="10px" />
                    <p
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                </Box>

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => ( 
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                m={2}
                                gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="email"
                                    label="E-Mail"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 3" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="Senha"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.senha}
                                    name="senha"
                                    error={!!touched.senha && !!errors.senha}
                                    helperText={touched.senha && errors.senha}
                                    sx={{ gridColumn: "span 3" }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="center" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Login
                                </Button>
                            </Box>
                            <Box pb={'10px'}>
                                <p>
                                    Não tem uma conta? {
                                        <Link relative="path" href="#" onClick={closeLogin}>
                                            Registrar
                                        </Link>
                                    }
                                </p>
                            </Box>
                        </form>
                    )}
                </Formik>

            </Grid>
        </Collapse>
    );
};

const checkoutSchema = yup.object().shape({
    senha: yup.string().required("Por favor, digite sua senha"),
    email: yup.string().email("Email Invalido").required("Requirido"),
  });
  
  const initialValues = {
    email: "",
    senha: "",
  };
  

export default LoginComp;