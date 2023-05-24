import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react";
import { alpha, styled } from '@mui/material/styles';
import { Field, Formik } from "formik";
import { DataGrid, gridClasses, getGridStringOperators } from "@mui/x-data-grid";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header/Header";
import api from "../../services/API/api";
import DateObject from "react-date-object";

import CreateAdvantages from "../../components/CreateAdvantages"
import EditInstitution from "../../components/EditInstitution"

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[100],
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


const CreateAdvantage = () => {
  const[initialValues, setInitialValues] = useState({
    nome: "",
    senha: "",
    papel: "",
    email: "",
    telefone1: "",
    telefone2: "",
    sexo: "",
    documentoLegal: "",
    bairro: "",
    numero: "",
    estado: "",
    rua: "",
    cep: "",
    dia: "",
    mes: "",
    ano: "2000",
  });


    const [isCriarOpen, setIsCriarOpen] = useState(false);

    const handleCriarToggle = () => {
        setIsCriarOpen(!isCriarOpen);
    };
    const [isEditOpen, setisEditOpen] = useState(false);

    const handleEditToggle = () => {
        setisEditOpen(!isEditOpen);
    };

    const [userEditParams, setEditRowData] = useState(null);

    const handleEditRow = (row) => {
        setEditRowData(row);
        setisEditOpen(true);
      };

  const columns = [
    { 
      field: "idAdvantages", 
      headerName: "ID",
    },
    {
      field: "advantageName",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Preço",
      flex: 1,
    },
    {
      field: "advantageDescription",
      headerName: "Descrição",
      flex: 1,
    },
    {
      field: "Delete",
      headerName: "Deleta",
      flex: 1,
      renderCell: (params) => {
          return (
              <Button
              onClick={(e) => {if(window.confirm('Delete the item?')){DeleteAdvantage(e, params.row)}}}
              variant="contained"
              >
              Deletar
              </Button>
          );
      }
    }
  ];

  const DeleteAdvantage = (e, row) => {
    e.stopPropagation();
    console.log(row)
    api
    .delete("/advantages/delete/idAdvantage/"+row.idAdvantage)
    .then(() => window.location.reload(false))
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
  const EditarTerceiro = (values) => {
    console.log(values)

    var cidade = values.cidade
    var estado = values.estado

    const UserBody = {
        address: {
        addressId: 0,
        city: cidade,
        district: values.bairro,
        number: values.numero,
        state: estado,
        street: values.rua,
        zipCode: values.cep
        },
        areaOfOperation: values.operacao,
        email: values.email,
        idThirdParty: values.idThirdParty,
        legalDocument: values.documentoLegal,
        thirdPartyName: values.nome,
        phone1: values.telefone1,
        phone2: values.telefone2,
        thirdPartyName: values.nome,
  }

  api 
    .post("/thirdParty/edit", UserBody)
    .then(() => window.location.reload(false))
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

const handleCreateSubmit = (values) => {
  var cidade = values.cidade
  var estado = values.estado

  const UserBody = {
    address: {
      addressId: 0,
      city: cidade,
      district: values.bairro,
      number: values.numero,
      state: estado,
      street: values.rua,
      zipCode: values.cep
    },
    areaOfOperation: values.operacao,
    email: values.email,
    idThirdParty: 0,
    legalDocument: values.documentoLegal,
    thirdPartyName: values.nome,
    phone1: values.telefone1,
    phone2: values.telefone2,
    thirdPartyName: values.nome,
  }

  

  api
      .post("/thirdParty/create", UserBody)
      .then(() => window.location.reload(false))
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
        setIsCriarOpen(false);
  };

const isNonMobile = useMediaQuery("(min-width:600px)");

//Pegar os dados para mostrar na Tabela
const [tableData, setTableData] = useState([])

useEffect(() => {
  api
    .get("/advantages/page/0/size/10")
    .then((response) =>  response.data.content)
    .then((response) => setTableData(response))
    
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
let handleCriarCancel = () => {
  setIsCriarOpen(false);
};

    return (
      <Box m="20px">
        <Header title="Criação das Vantagens" subtitle="Aqui você pode Criar, Visualizar, e Editar as suas Vantagems" />
            <Button variant="outlined" color="success" sx={{ mb: 2 }} size="large" 
                onClick={() => {
                    if(isEditOpen) setisEditOpen(false);
                    {handleCriarToggle()};
                }}
            >
                Criar Vantagem
            </Button>
            <CreateAdvantages isFormOpen = {isCriarOpen} handleFormSubmit={handleCreateSubmit}  handleFormCancel={handleCriarCancel} />
            <Box
                m="40px 0 0 0"
                height="70vh"
                width='99%'
                sx={{
                    "& .MuiDataGrid-root": {
                    border: "none",
                    },
                    '& .MuiDataGrid-cell': {
                    borderRight: `0px solid black`,
                    borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#AAA",
                    color: "#000",
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
                    rows={tableData}
                    columns={columns}
                    getRowId={(row) => row.idAdvantages}
                />
            </Box>
        </Box>
    );
};

export default CreateAdvantage;