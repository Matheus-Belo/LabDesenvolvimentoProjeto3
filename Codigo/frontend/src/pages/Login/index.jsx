import { Box, Button, TextField, useTheme, Grid } from "@mui/material";
import { ColorTokens } from "../../theme";
import { Field, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import * as yup from "yup";
import api from "../../services/API/api";
import Header from "../../components/Header/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoginComp from "../../components/LoginComp";
import Register from "../../components/Register";



const Login = () => {
    const theme = useTheme();
    const colors = ColorTokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    let navigate = useNavigate();
    const [authenticated, setauthenticated] = useState(sessionStorage.getItem(sessionStorage.getItem("authenticated")|| false));

    const [isLoginOpen, setIsLoginOpen] = useState(true);

    const handleLoginToggle = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const handleRegisterToggle = () => {
        setIsRegisterOpen(!isRegisterOpen);
    };

    let closeLogin = () => {
        setIsLoginOpen(!isLoginOpen);
        setIsRegisterOpen(!isRegisterOpen);
    }


    //sessionStorage.clear();

    return (
        <Box
            sx={{
                textAlign: "center",
                width: "100%",
                flexWrap: "wrap",      
            }}
            ml="30%" mt="5%" mr="30%" alignItems="center"
        >
            <LoginComp isLoginOpen={ isLoginOpen }  closeLogin={closeLogin}/>
            <Register isRegisterOpen={ isRegisterOpen } closeLogin={closeLogin}/>
        </Box>
    );
};
  

export default Login;