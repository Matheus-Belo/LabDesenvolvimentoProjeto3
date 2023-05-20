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

import Transferencia from "../../modal/Transferencia"

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


const Alunos = () => {

  const Role = sessionStorage.getItem("Role");
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

      const isNonMobile = useMediaQuery("(min-width:600px)");

      //Pegar os dados para mostrar na Tabela
      const [tableData, setTableData] = useState([])

      useEffect(() => {
        api
          .get("/user/page/0/size/10")
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

        const LogResponse = (values) =>{
          var arr = [];
      
          for(let i = 0; i < values.length; i++){
              if(values[i].roles[0].name == "ALUNO"){
                  arr.push(values[i])
              } 
          }
          setTableData(arr)
        }

  const columns = [
    { 
      field: "idUser", 
      headerName: "ID",
    },
    {
      field: "name",
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
    field: "legal_document",
    headerName: "Documento Legal",
    flex: 1,
    },
    {
    field: "transferir",
    headerName: "Transferir",
    flex: 1,
    renderCell: (params) => {
        return (
            <Transferencia User = {params.row}/>
        );
    }
    },
      
  ];


    return (
        <Box m="20px">
            <Header title="Alunos" subtitle="Aqui você pode Criar, Visualizar, Editar ou Deletar Professores" />
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
                    getRowId={(row) => row.idUser}
                />
            </Box>
        </Box>
    );
  }

export default Alunos;