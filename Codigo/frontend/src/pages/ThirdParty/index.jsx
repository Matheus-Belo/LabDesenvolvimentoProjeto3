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

import CreateThirdParty from "../../components/CreateThirdParty"
import EditThirdParty from "../../components/EditThirdParty"

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


const ThirdParty = () => {
    const[initialValues, setInitialValues] = useState({
        nome: "",
        //senha: "",
        operacao: "",
        email: "",
        telefone1: "",
        telefone2: "",
        documentoLegal: "",
        bairro: "",
        numero: "",
        estado: "",
        rua: "",
        cep: "",
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
      field: "idThirdParty", 
      headerName: "ID",
    },
    {
      field: "thirdPartyName",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      flex: 1,
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
      field: "Edit",
      headerName: "Alterar",
      flex: 1,
      renderCell: (params) => {
          return (
              <Button

                onClick={ (e) => { 
                    if(isCriarOpen){
                        setIsCriarOpen(!isCriarOpen);
                        handleEditToggle();
                    }else if(isEditOpen){
                        if(initialValues.idUser === params.row.idUser){
                            handleEditToggle();
                        }
                    }else{
                        handleEditToggle();
                    };
                        const newInitialValues = {
                            idThirdParty: params.row.idThirdParty ,
                            nome: params.row.thirdPartyName ,
                            operacao: params.row.areaOfOperation ,
                            email: params.row.email ,
                            telefone1: params.row.phone1 ,
                            telefone2: params.row.phone2 ,
                            documentoLegal: params.row.legalDocument ,
                            bairro: params.row.address.district ,
                            cidade: params.row.address.city.city ,
                            numero: params.row.address.number ,
                            estado: params.row.address.state.uf ,
                            rua: params.row.address.street ,
                            cep: params.row.address.zipCode ,
                        }
                        const rowData = e.row;
                        setInitialValues(newInitialValues);
                        setEditRowData(rowData);

                        //console.log(params.row)
                    }
                    
                }
              variant="contained"
              >
              Editar
              </Button>
          );
      }},
      {
      field: "Delete",
      headerName: "Deleta",
      flex: 1,
      renderCell: (params) => {
          return (
              <Button
              onClick={(e) => {if(window.confirm('Delete the item?')){DeleteUser(e, params.row)}}}
              variant="contained"
              >
              Deletar
              </Button>
          );
      }}
  ];

  const DeleteUser = (e, row) => {
    e.stopPropagation();
    console.log(row)
    api
    .delete("/thirdParty/delete/idThirdParty/"+row.idThirdParty)
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

let handleEditCancel = () => {
    setisEditOpen(false);
  };
  let handleCriarCancel = () => {
    setIsCriarOpen(false);
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
    .get("/thirdParty/page/0/size/10")
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


    return (
      <Box m="20px">
        <Header title="Instituição" subtitle="Aqui está todas as Instituições" />
            <Button variant="outlined" color="success" sx={{ mb: 2 }} size="large" 
                onClick={() => {
                    if(isEditOpen) setisEditOpen(false);
                    {handleCriarToggle()};
                }}
            >
                Criar Instituição
            </Button>
            <CreateThirdParty isFormOpen = {isCriarOpen} handleFormSubmit={handleCreateSubmit}  handleFormCancel={handleCriarCancel} />
            <EditThirdParty isFormOpen = {isEditOpen} handleFormSubmit={EditarTerceiro} handleFormCancel={handleEditCancel} initialValues={initialValues}/>
            <Box
                m="40px 0 0 0"
                height="70vh"
                width='99.9%'
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
                    getRowId={(row) => row.idThirdParty}
                />
            </Box>
        </Box>
    );
};

export default ThirdParty;