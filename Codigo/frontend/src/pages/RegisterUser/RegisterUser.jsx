import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { alpha, styled } from '@mui/material/styles';
import { Field, Formik } from "formik";
import { DataGrid, gridClasses, getGridStringOperators } from "@mui/x-data-grid";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header/Header";
import api from "../../services/API/api";
import DateObject from "react-date-object";

const RegisterUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    var role = values.papel
    var addressID = 0

    if(values.estado === localStorage.getItem("state")){
        addressID = localStorage.getItem("addresId")
    }else{
        addressID = 0
    }

    const UserBody = {
        
      address: {
        addressId: addressID,
        city: values.cidade,
        district: values.bairro,
        number: values.numero,
        state: values.estado,
        street: values.rua,
        zipCode: values.cep
      },
      birthDate: new DateObject(values.ano + "/" + values.mes + "/" + values.dia),
      email: values.email,
      idUser: localStorage.getItem("EditUserId"),
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

    api
        .post("/user/edit", UserBody)
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

    localStorage.removeItem("ano")
    localStorage.removeItem("dia")
    localStorage.removeItem("number")
    localStorage.removeItem("phone1")
    localStorage.removeItem("phone2")
    localStorage.removeItem("EditUserId")
    localStorage.removeItem("district")
    localStorage.removeItem("legalDocument")
    localStorage.removeItem("zip")
    localStorage.removeItem("city")
    localStorage.removeItem("name")
    localStorage.removeItem("street")
    localStorage.removeItem("state")
    localStorage.removeItem("addressId")
    localStorage.removeItem("mes")
    localStorage.removeItem("email")
    localStorage.removeItem("sex")

  };


  //Pegar os dados para mostrar na Tabela

  return (
    <Box m="20px">
      <Header title="Editar Usuarios" subtitle="Editar um Usuario existente" />

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
                Editar Usuario
              </Button>
            </Box>
          </form>
        )}
      </Formik>
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
  documentoLegal: yup.string().required("Requirido"),
  senha: yup.string().required("Requirido"),
});

const initialValues = {
  nome: localStorage.getItem("name"),
  senha: "",
  papel: "TEST",
  email: localStorage.getItem("email"),
  telefone1: localStorage.getItem("phone1"),
  telefone2: localStorage.getItem("phone2"),
  sexo: localStorage.getItem("sex"),
  documentoLegal: localStorage.getItem("legalDocument"),
  bairro: localStorage.getItem("district"),
  numero: localStorage.getItem("number"),
  estado: localStorage.getItem("state"),
  rua: localStorage.getItem("street"),
  cep: localStorage.getItem("zip"),
  dia: localStorage.getItem("dia"),
  mes: localStorage.getItem("mes"),
  ano: localStorage.getItem("ano"),
};

export default RegisterUser;