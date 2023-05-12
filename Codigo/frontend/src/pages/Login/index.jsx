import { Box, Button, TextField, useTheme } from "@mui/material";
import { ColorTokens } from "../../theme";
import { Field, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import * as yup from "yup";
import api from "../../services/API/api";
import Header from "../../components/Header/Header";
import useMediaQuery from "@mui/material/useMediaQuery";



const Login = () => {
    const theme = useTheme();
    const colors = ColorTokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    let navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [authenticated, setauthenticated] = useState(sessionStorage.getItem(sessionStorage.getItem("authenticated")|| false));

    /** 
    if(localStorage.getItem("token") !== null){
        localStorage.removeItem("token");
    }
    */

    const handleFormSubmit = async (values) => {
        const LoginInfo = {
            email: values.email,
            password: values.senha,
        }

        console.log(LoginInfo);

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

        setauthenticated(true)
        sessionStorage.setItem("authenticated", true);
        sessionStorage.setItem("token", Info.data.token);

        window.location.reload(true)
    };

    return (
        <>
            <Box 
                sx={{
                    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)",
                    textAlign: "center",
                    width: "100%",
                    height: "30%",
                    backgroundColor: "#111",
                }}
                ml="30%" mt="5%" mr="30%"
            >
                <Header  title="Login" subtitle="Faça o login para poder acessar o sistema" />
                <p
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>

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
                            Não tem uma conta? {<Link to="/RegisterUser" relative="path">
                                    Registrar
                                </Link>
                            }
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
};

/**
 *              <Link to="/" relative="path">
                    <h1>Go back to Dashboard</h1>
                </Link>
 */

const checkoutSchema = yup.object().shape({
    senha: yup.string().required("Por favor, digite sua senha"),
    email: yup.string().email("Email Invalido").required("Requirido"),
  });
  
  const initialValues = {
    nome: "",
    senha: "",
  };
  

export default Login;


/**
 * const handleFormSubmit = (values) => {
        const LoginInfo = {
            email: values.email,
            senha: values.senha,
        }

        api
            .post("/auth/login", LoginInfo)
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log("The request was made and the server responded with a status code that falls out of the range of 2xx");
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log("The request was made but no response was received");
                  console.log(error.request);
                  console.log(error.toJSON());
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.config);
              });
        //navigate("/");
    };
 */