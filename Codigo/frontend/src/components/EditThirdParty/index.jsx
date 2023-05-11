import { Box, TextField } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react";
import { alpha, styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { Field, Formik } from "formik";
import { DataGrid, gridClasses, getGridStringOperators } from "@mui/x-data-grid";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header/Header";
import api from "../../services/API/api";
import DateObject from "react-date-object";

const EditThirdParty = ( {isFormOpen, handleFormSubmit, handleFormCancel, initialValues } ) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    console.log(initialValues)

    if(!isFormOpen) return null;
    else{
        console.log(initialValues.nome)
  return (
    <>

      <Collapse in={isFormOpen}>
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
                label="Nome Completo da Instituição"
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
                label="Area de Atuação"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.operacao}
                name="operacao"
                error={!!touched.operacao && !!errors.operacao}
                helperText={touched.operacao && errors.operacao}
                sx={{ gridColumn: "span 3" }}
              />

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
                <Button type="button" onClick={handleFormCancel} color="error" variant="contained" sx={{ mr: 2}}>
                    Cancelar
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                    Editar Instutituição
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      </Collapse>
      </>
  );
            }
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("Requirido"),
  email: yup.string().email("Email Invalido").required("Requirido"),
  telefone1: yup
    .string()
    .matches(phoneRegExp, "Telefone Invalido")
    .required("Requirido"),
  telefone2: yup
    .string()
    .matches(phoneRegExp, "Telefone Invalido")
    .required("Requirido"),

  operacao: yup.string().required("Requirido"),
  bairro: yup.string().required("Requirido"),
  numero: yup.string().required("Requirido"),
  estado: yup.string().required("Requirido"),
  rua: yup.string().required("Requirido"),
  cep: yup.string().required("Requirido"),
  documentoLegal: yup.string().required("Requirido"),
});


export default EditThirdParty;