import { Box, TextField, Select } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import MenuItem from '@mui/material/MenuItem';
import api from "../../services/API/api";
import useMediaQuery from "@mui/material/useMediaQuery";
import populateFormData from "../../components/FormData";
import axios from "axios";


let reqInstance = axios.create({
  baseURL: "http://localhost:9999",
  headers: {
    Authorization : `Bearer ${sessionStorage.getItem("token")}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Request-Method' : '*',
    }
  }
})

const CreateAdvantages = ( { isFormOpen, handleFormCancel } ) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    api
      .get("/thirdParty/page/0/size/10")
      .then((response) =>  response.data.content)
      .then((response) => LogResponse(response))
      
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

  const [Data2, setData] = useState([])

  const Data = []
  
  const LogResponse = (values) =>{
    for(var i = 0; i < values.length; i++){
      const name = values[i].thirdPartyName
      const id = values[i].idThirdParty
      Data.push({id, name})
    }
    setData(Data)
  }

  const handleFormSubmit = (values) => {
    if(selectedImage === null){
      alert("Selecione uma imagem")
    }else{
      const imgPath = URL.createObjectURL(selectedImage);

      const AdvantageData = {
        advantageCategory: values.categoria,
        advantageDescription: values.disconto + "% de desconto <br>" + values.descricao,
        AdvantageName: values.nome,
        AdvantageImages: [
          {
            advantageImageDescription: "Imagem da Vantagem",
            advantageImageName: selectedImage.name,
            advantageImagePath: imgPath,
            idAdvantages: 0,
            idAdvantagesImage: 0,
          }
        ],
        couponCode: 0,
        idAdvantages: 0,
        imagePaths: [
          imgPath
        ],
        price: values.preco,
        status: "AVAILABLE",
        thirdParty: values.idThirdParty,
        validationDate: values.dias
      }
      console.log(AdvantageData)

      var FormData2 = new FormData();




      console.log(populateFormData(values = {AdvantageData}))

      reqInstance
        .post("/advantages/create", populateFormData(values = {AdvantageData}))
        //.then(() => window.location.reload(false))
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
      }
  }

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
                label="Nome da Vantagem"
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
                label="Preço da Vantagem"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.preco}
                name="preco"
                error={!!touched.preco && !!errors.preco}
                helperText={touched.preco && errors.preco}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Categoria"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.categoria}
                name="categoria"
                error={!!touched.categoria && !!errors.categoria}
                helperText={touched.categoria && errors.categoria}
                sx={{ gridColumn: "span 3" }}
              >
                <MenuItem value={"ALIMENTOS"}>Alimento</MenuItem>
                <MenuItem value={"MATERIAIS"}>Materiais Escolares/Educacionais</MenuItem>
                <MenuItem value={"EVENTOS"}>Evento</MenuItem>
                <MenuItem value={"SOFTWARE"}>Software/Programas</MenuItem>
                <MenuItem value={"OUTROS"}>Outros</MenuItem>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                multiline
                maxRows={6}
                label="Descrição da Vantagem"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descricao}
                name="descricao"
                error={!!touched.descricao && !!errors.descricao}
                helperText={touched.descricao && errors.descricao}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Disconto de Quanto porcento?(%)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.disconto}
                name="disconto"
                error={!!touched.disconto && !!errors.disconto}
                helperText={touched.disconto && errors.disconto}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Quantidade de Dias de Validade (dias)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dias}
                name="dias"
                error={!!touched.dias && !!errors.dias}
                helperText={touched.dias && errors.dias}
                sx={{ gridColumn: "span 1" }}
              >
                <MenuItem value={"30"}>30</MenuItem>
                <MenuItem value={"60"}>60</MenuItem>
                <MenuItem value={"90"}>90</MenuItem>
                <MenuItem value={"120"}>120</MenuItem>
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                select
                label="Empresa Parceira"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.idThirdParty}
                name="idThirdParty"
                error={!!touched.idThirdParty && !!errors.idThirdParty}
                helperText={touched.idThirdParty && errors.idThirdParty}
                sx={{ gridColumn: "span 1" }}
              >
                {Data2.map(Data2 => {
                            return (
                              <MenuItem value={Data2.id}>
                                {Data2.name}
                              </MenuItem>
                            )
                  })}
              </TextField>

              <Button
                variant="contained"
                component="label"
                sx={{ gridColumn: "span 3" }}
              >
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                  }}
                />
              </Button>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="button" onClick={handleFormCancel} color="error" variant="contained" sx={{ mr: 2}}>
                    Cancelar
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Criar Nova Vantagem
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      
      </Collapse>
      </>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("Requirido"),
  categoria: yup.string().required("Requirido").oneOf(["ALIMENTOS", "MATERIAIS", "EVENTOS", "SOFTWARE", "OUTROS"]).label("Categoria"),
  descricao: yup.string().required("Requirido"),
  disconto: yup.string().required("Requirido"),
  dias: yup.string().required("Requirido").oneOf(["30", "60", "90", "120"]).label("dias"),
  idThirdParty: yup.string().required("Requirido").label("Empresa Parceira"),
});

const initialValues = {
  nome: "",
  categoria: "",
  descricao: "",
  disconto: "",
  dias: "",
};

export default CreateAdvantages;