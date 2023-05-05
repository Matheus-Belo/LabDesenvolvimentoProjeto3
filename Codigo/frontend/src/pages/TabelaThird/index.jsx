import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { alpha, styled } from '@mui/material/styles';
import { Field, Formik } from "formik";
import { DataGrid, gridClasses, getGridStringOperators } from "@mui/x-data-grid";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header/Header";
import api from "../../services/API/api";
import DateObject from "react-date-object";

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

const UserTable = () => {

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
                onClick={(e) => EditarUser(e, params.row)}
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

    const navigate = useNavigate();

    const DeleteUser = (e, row) => {
        e.stopPropagation();
        console.log(row)
        api
        .post("/user/delete/", row.email)
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


    const EditarUser = (e, row) => {
        e.stopPropagation();
        console.log(row)
        localStorage.setItem("EditThirdPartyID", row.idThirdParty)
        localStorage.setItem("addressId", row.address.addressId)
        localStorage.setItem("city", row.address.city.city)
        localStorage.setItem("district", row.address.district)
        localStorage.setItem("number", row.address.number)
        localStorage.setItem("state", row.address.state.uf)
        localStorage.setItem("street", row.address.street)
        localStorage.setItem("zip", row.address.zipCode)

        var dia = new DateObject(row.birthDate).format("DD")
        var mes = new DateObject(row.birthDate).format("MM")
        var ano = new DateObject(row.birthDate).format("YYYY")

        localStorage.setItem("dia", dia)
        localStorage.setItem("mes", mes)
        localStorage.setItem("ano", ano)
        localStorage.setItem("email", row.email)
        localStorage.setItem("legalDocument", row.legalDocument)
        localStorage.setItem("name", row.thirdPartyName)
        localStorage.setItem("phone1", row.phone1)
        localStorage.setItem("phone2", row.phone2)
        navigate("/EditUsers")
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

export default UserTable;