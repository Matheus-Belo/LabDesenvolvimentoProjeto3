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
import CreateTeacher from "../../components/CreateTeacher"
import EditTeacher from "../../components/EditTeacher"

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


const Teachers = () => {

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
              if(values[i].roles[0].name == "PROFESSOR"){
                  arr.push(values[i])
              } 
          }
          setTableData(arr)
        }

  if(Role == "ADMIN"){
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
                            idUser: params.row.idUser ,
                            nome: params.row.name ,
                            senha: "",
                            papel: params.row.roles[0].name,
                            email: params.row.email ,
                            telefone1: params.row.phone1 ,
                            telefone2: params.row.phone2 ,
                            sexo: params.row.sex ,
                            documentoLegal: params.row.legal_document ,
                            bairro: params.row.address.district ,
                            cidade: params.row.address.city.city ,
                            numero: params.row.address.number ,
                            estado: params.row.address.state.uf ,
                            rua: params.row.address.street ,
                            cep: params.row.address.zipCode ,
                            dia: new DateObject(params.row.birthDate).format("DD") ,
                            mes: new DateObject(params.row.birthDate).format("MM") ,
                            ano: new DateObject(params.row.birthDate).format("YYYY"),
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
    .delete("/user/delete/email/"+row.email)
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

  const EditarUser = (values) => {

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
      idUser: values.idUser,
      legalDocument: values.documentoLegal,
      name: values.nome,
      password: values.senha,
      phone1: values.telefone1,
      phone2: values.telefone2,
      roles: 
        role,
      sex: values.sexo,
    }

    api
        .post("/user/edit", UserBody)
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
        "PROFESSOR",
      ],
      sex: values.sexo,
    }

    api
        .post("/user/create", UserBody)
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
    return (
        <Box m="20px">
            <Header title="Professores" subtitle="Aqui você pode Criar, Visualizar, Editar ou Deletar Professores" />
            <Button variant="outlined" color="success" sx={{ mb: 2 }} size="large" 
                onClick={() => {
                    if(isEditOpen) setisEditOpen(false);
                    {handleCriarToggle()};
                }}
            >
                Criar Professor
            </Button>
            <CreateTeacher isFormOpen = {isCriarOpen} handleFormSubmit={handleCreateSubmit}  handleFormCancel={handleCriarCancel} />
            <EditTeacher isFormOpen = {isEditOpen} handleFormSubmit={EditarUser} valores={userEditParams} handleFormCancel={handleEditCancel} initialValues={initialValues}/>
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
                    getRowId={(row) => row.idUser}
                />
            </Box>
        </Box>
    );
  }else{
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
                            idUser: params.row.idUser ,
                            nome: params.row.name ,
                            senha: "",
                            papel: params.row.roles[0].name,
                            email: params.row.email ,
                            telefone1: params.row.phone1 ,
                            telefone2: params.row.phone2 ,
                            sexo: params.row.sex ,
                            documentoLegal: params.row.legal_document ,
                            bairro: params.row.address.district ,
                            cidade: params.row.address.city.city ,
                            numero: params.row.address.number ,
                            estado: params.row.address.state.uf ,
                            rua: params.row.address.street ,
                            cep: params.row.address.zipCode ,
                            dia: new DateObject(params.row.birthDate).format("DD") ,
                            mes: new DateObject(params.row.birthDate).format("MM") ,
                            ano: new DateObject(params.row.birthDate).format("YYYY"),
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
    .delete("/user/delete/email/"+row.email)
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

const EditarUser = (values) => {

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
      idUser: values.idUser,
      legalDocument: values.documentoLegal,
      name: values.nome,
      password: values.senha,
      phone1: values.telefone1,
      phone2: values.telefone2,
      roles: 
        role,
      sex: values.sexo,
    }

    api
        .post("/user/edit", UserBody)
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
        "PROFESSOR",
      ],
      sex: values.sexo,
    }

    api
        .post("/user/create", UserBody)
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



    return (
        <Box m="20px">
            <Header title="Professores" subtitle="Aqui você pode Criar, Visualizar, Editar ou Deletar Professores" />
            <Button variant="outlined" color="success" sx={{ mb: 2 }} size="large" 
                onClick={() => {
                    if(isEditOpen) setisEditOpen(false);
                    {handleCriarToggle()};
                }}
            >
                Criar Professor
            </Button>
            <CreateTeacher isFormOpen = {isCriarOpen} handleFormSubmit={handleCreateSubmit}  handleFormCancel={handleCriarCancel} />
            <EditTeacher isFormOpen = {isEditOpen} handleFormSubmit={EditarUser} valores={userEditParams} handleFormCancel={handleEditCancel} initialValues={initialValues}/>
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
                    getRowId={(row) => row.idUser}
                    initialState={{
                      pagination: {
                        paginationModel: { pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </Box>
        </Box>
    );
  }
};

export default Teachers;