import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { alpha, styled } from '@mui/material/styles';
import { Field, Formik } from "formik";
import { DataGrid, gridClasses, getGridStringOperators } from "@mui/x-data-grid";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header/Header";
import api from "../../services/API/api"
import { mockDataContacts } from "../../data/mockData";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));


const Users = () => {

  const columns = [
    { field: "idUser", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone1",
      headerName: "Telefone 1",
      flex: 1,
    },
    {
      field: "phone2",
      headerName: "Telefone 2",
      flex: 1,
    },
    {
      field: "role.name",
      headerName: "Papel",
      flex: 1,
    },
  ];

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const [user, setUser] = useState(''); 

  useEffect(() => {
    api
      .get("/user/page/0/size/10")
      .then((response) => { console.log("sucess")})
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
  }, []);

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
                type="text"
                label="Papel"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.papel}
                name="papel"
                error={!!touched.papel && !!errors.papel}
                helperText={touched.papel && errors.papel}
                sx={{ gridColumn: "span 3" }}
              />
              Aniversario
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
                type="text"
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
                type="text"
                label="Sexo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sexo}
                name="sexo"
                error={!!touched.sexo && !!errors.sexo}
                helperText={touched.sexo && errors.sexo}
                sx={{ gridColumn: "span 3" }}
              />
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
                type="text"
                label="Estado"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.estado}
                name="estado"
                error={!!touched.estado && !!errors.estado}
                helperText={touched.estado && errors.estado}
                sx={{ gridColumn: "span 1" }}
              />
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
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      
      <Box
          m="40px 0 0 0"
          height="70vh"
          width='95%'
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            '& .MuiDataGrid-cell': {
              borderRight: `0px solid black`,
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#CCCCCC",
              borderBottom: "0.5px solid black",
            },
            "& .MuiDataGrid-virtualScroller": {
              //backgroundColor: ,
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: `0px solid black`,
              //backgroundColor: colors.collors.bg,
            },
            "& .MuiCheckbox-root": {
             // color: `${colors.collors.bg} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              //color: `${colors.collors.bg} !important`,
            },
            boxShadow: 3,
          }}
        >
          <StripedDataGrid
            rows={mockDataContacts}
            columns={columns}
          />
        </Box>
    </Box>
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
  bairro: yup.string().required("Requirido"),
  numero: yup.string().required("Requirido"),
  estado: yup.string().required("Requirido"),
  rua: yup.string().required("Requirido"),
  cep: yup.string().required("Requirido"),
  papel: yup.string().required("Requirido"),
});
const initialValues = {
  nome: "",
  papel: "",
  email: "",
  telefone1: "",
  telefone2: "",
  sexo: "",
  bairro: "",
  numero: "",
  estado: "",
  rua: "",
  cep: "",
  dia: "",
  mes: "",
  ano: "2000",
};

export default Users;
