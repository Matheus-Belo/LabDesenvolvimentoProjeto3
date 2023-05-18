import { Box, Button, TextField, useTheme, Grid, Collapse, MenuItem } from "@mui/material";
import { ColorTokens } from "../../theme";
import { Field, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import * as yup from "yup";
import api from "../../services/API/api";
import Header from "../Header/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import DateObject from "react-date-object";


const Register = ( { isRegisterOpen, closeLogin } ) => {
    const theme = useTheme();
    const colors = ColorTokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    let navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [authenticated, setauthenticated] = useState(sessionStorage.getItem(sessionStorage.getItem("authenticated")|| false));

    //sessionStorage.clear();

    const handleCreateSubmit = (values) => {
        var role = values.papel
    
        const UserBody = {
          address: {
            addressId: 0,
            city: values.cidade,
            district: values.bairro,
            number: values.numero,
            state: values.estado,
            street: values.rua,
            zipCode: values.cep
          },
          birthDate: new DateObject(values.ano + "/" + values.mes + "/" + values.dia),
          email: values.email,
          idUser: 0,
          legalDocument: values.documentoLegal,
          name: values.nome,
          password: values.senha,
          phone1: values.telefone1,
          phone2: values.telefone2,
          roles: [
            role,
          ],
          sex: values.sexo,
        }

        const LoginValues = {
            email: values.email,
            senha: values.senha,
        }
    

        api
            .post("/user/create", UserBody)
            .then(() => handleFormSubmit(LoginValues))
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
      };



    const handleFormSubmit = async (values) => {    
        const LoginInfo = {
            email: values.email,
            password: values.senha,
        }

        //Olhar qual o JSON sendo mandado para o backend
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

        //console.log(Info.data.roles);
        setauthenticated(true)
        sessionStorage.setItem("authenticated", true);
        sessionStorage.setItem("token", Info.data.token);
        sessionStorage.setItem("Role", Info.data.roles);
        sessionStorage.setItem("ID", Info.data.user.id);

        window.location.reload(true)
    };

    return (
        <Collapse in={isRegisterOpen}>
            <Grid
                sx={{
                    borderRadius: '16px',
                    backgroundColor: "#111",
                    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)",
                }}
                pr="25px" pl="25px" pt="20px" pb="30px"
            >
                <Box pt="10px">
                    <Header  title="Registrar" subtitle="Cria a sua conta" pt="10px" />
                    <p
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                </Box>

                <Formik
                    onSubmit={handleCreateSubmit}
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
                        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                        >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Nome Completo"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.nome}
                            name="nome"
                            error={!!touched.nome && !!errors.nome}
                            helperText={touched.nome && errors.nome}
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
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Documento Legal"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.documentoLegal}
                            name="documentoLegal"
                            error={!!touched.documentoLegal && !!errors.documentoLegal}
                            helperText={touched.documentoLegal && errors.documentoLegal}
                            sx={{ gridColumn: "span 3" }}
                        />

                            <TextField
                            fullWidth
                            variant="filled"
                            select
                            label="Papel"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.papel}
                            name="papel"
                            error={!!touched.papel && !!errors.papel}
                            helperText={touched.papel && errors.papel}
                            sx={{ gridColumn: "span 3" }}
                        >
                            <MenuItem value={"ALUNO"}>Aluno</MenuItem>
                            <MenuItem value={"THIRDPARTY"}>Empresa</MenuItem>
                        </TextField>
                        <Box
                            sx={{
                                gridColumn: "span 3",
                            }}
                        >
                            Aniversario
                        </Box>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                            sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                            gridColumn: "span 3"
                            }}
                        >
                            <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            min="0"
                            max="31"
                            label="Dia"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.dia}
                            name="dia"
                            error={!!touched.dia && !!errors.dia}
                            helperText={touched.dia && errors.dia}
                            sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Mês"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.mes}
                            name="mes"
                            error={!!touched.mes && !!errors.mes}
                            helperText={touched.mes && errors.mes}
                            sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                            fullWidth
                            variant="filled"
                            type="Number"
                            label="Ano"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.ano}
                            name="ano"
                            error={!!touched.ano && !!errors.ano}
                            helperText={touched.ano && errors.ano}
                            sx={{ gridColumn: "span 1" }}
                            />
                        </Box>

                        <TextField
                            fullWidth
                            variant="filled"
                            type="email"
                            label="Email"
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
                            type="text"
                            label="Telefone"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.telefone1}
                            name="telefone1"
                            error={!!touched.telefone1 && !!errors.telefone1}
                            helperText={touched.telefone1 && errors.telefone1}
                            sx={{ gridColumn: "span 3" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Telefone 2"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.telefone2}
                            name="telefone2"
                            error={!!touched.telefone2 && !!errors.telefone2}
                            helperText={touched.telefone2 && errors.telefone2}
                            sx={{ gridColumn: "span 3" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            select
                            label="Sexo"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.sexo}
                            name="sexo"
                            error={!!touched.sexo && !!errors.sexo}
                            helperText={touched.sexo && errors.sexo}
                            sx={{ gridColumn: "span 3" }}
                        >
                            <MenuItem value={"M"}>Masculino</MenuItem>
                            <MenuItem value={"F"}>Feminino</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Cidade"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.cidade}
                            name="cidade"
                            error={!!touched.cidade && !!errors.cidade}
                            helperText={touched.cidade && errors.cidade}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Bairro"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bairro}
                            name="bairro"
                            error={!!touched.bairro && !!errors.bairro}
                            helperText={touched.bairro && errors.bairro}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Numero"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.numero}
                            name="numero"
                            error={!!touched.numero && !!errors.numero}
                            helperText={touched.numero && errors.numero}
                            sx={{ gridColumn: "span 1" }}
                        />
                        
                        <TextField
                            fullWidth
                            variant="filled"
                            select
                            label="Estado"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.estado}
                            name="estado"
                            error={!!touched.estado && !!errors.estado}
                            helperText={touched.estado && errors.estado}
                            sx={{ gridColumn: "span 1" }}
                        >
                            <MenuItem value={"AC"}>Acre</MenuItem>
                            <MenuItem value={"AL"}>Alagoas</MenuItem>
                            <MenuItem value={"AP"}>Amapá</MenuItem>
                            <MenuItem value={"AM"}>Amazonas</MenuItem>
                            <MenuItem value={"BA"}>Bahia</MenuItem>
                            <MenuItem value={"CE"}>Ceará</MenuItem>
                            <MenuItem value={"DF"}>Distrito Federal</MenuItem>
                            <MenuItem value={"ES"}>Espírito Santo</MenuItem>
                            <MenuItem value={"GO"}>Goiás</MenuItem>
                            <MenuItem value={"MA"}>Maranhão</MenuItem>
                            <MenuItem value={"MT"}>Mato Grosso</MenuItem>
                            <MenuItem value={"MS"}>Mato Grosso do Sul</MenuItem>
                            <MenuItem value={"MG"}>Minas Gerais</MenuItem>
                            <MenuItem value={"PA"}>Pará</MenuItem>
                            <MenuItem value={"PB"}>Paraíba</MenuItem>
                            <MenuItem value={"PR"}>Paraná</MenuItem>
                            <MenuItem value={"PE"}>Pernambuco</MenuItem>
                            <MenuItem value={"PI"}>Piauí</MenuItem>
                            <MenuItem value={"RJ"}>Rio de Janeiro</MenuItem>
                            <MenuItem value={"RN"}>Rio Grande do Norte</MenuItem>
                            <MenuItem value={"RS"}>Rio Grande do Sul</MenuItem>
                            <MenuItem value={"RO"}>Rondônia</MenuItem>
                            <MenuItem value={"RR"}>Roraima</MenuItem>
                            <MenuItem value={"SC"}>Santa Catarina</MenuItem>
                            <MenuItem value={"SP"}>São Paulo</MenuItem>
                            <MenuItem value={"SE"}>Sergipe</MenuItem>
                            <MenuItem value={"TO"}>Tocantins</MenuItem>

                        </TextField>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Rua"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.rua}
                            name="rua"
                            error={!!touched.rua && !!errors.rua}
                            helperText={touched.rua && errors.rua}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="CEP"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.cep}
                            name="cep"
                            error={!!touched.cep && !!errors.cep}
                            helperText={touched.cep && errors.cep}
                            sx={{ gridColumn: "span 1" }}
                        />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="button" onClick={closeLogin} color="error" variant="contained" sx={{ mr: 2}}>
                            Cancelar
                        </Button>
                        <Button type="submit" color="secondary" variant="contained">
                            Criar Conta
                        </Button>
                        </Box>
                    </form>
                    )}
                </Formik>

            </Grid>
        </Collapse>
    );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("Requirido"),
  dia: yup.number().min(1, 'Dia Invalido').max(31, 'Dia Invalido').required("Requirido"),
  mes: yup.number().min(1, 'Mes Invalido').max(13, 'Mes Invalido').required("Requirido"),
  ano: yup.number().min(1900, 'Ano Invalido').max(2023, 'Ano Invalido').required("Requirido"),
  email: yup.string().email("Email Invalido").required("Requirido"),
  telefone1: yup
    .string()
    .matches(phoneRegExp, "Telefone Invalido")
    .required("Requirido"),
  telefone2: yup
    .string()
    .matches(phoneRegExp, "Telefone Invalido")
    .required("Requirido"),

  sexo: yup.string().required("Requirido"),
  cidade: yup.string().required("Requirido"),
  bairro: yup.string().required("Requirido"),
  numero: yup.string().required("Requirido"),
  estado: yup.string().required("Requirido"),
  rua: yup.string().required("Requirido"),
  cep: yup.string().required("Requirido"),
  papel: yup.string().required("Requirido"),
  documentoLegal: yup.string().required("Requirido"),
  senha: yup.string().required("Requirido"),
});

const initialValues = {
  nome: "",
  senha: "",
  papel: "",
  email: "",
  telefone1: "",
  telefone2: "",
  sexo: "",
  cidade: "",
  documentoLegal: "",
  bairro: "",
  numero: "",
  estado: "",
  rua: "",
  cep: "",
  dia: "",
  mes: "",
  ano: "2000",
};
  

export default Register;