import { Box, Button, Typography, Modal, Grid, TextField}  from '@mui/material';
import React, { useEffect, useState } from "react";
import api from "../../services/API/api";
import * as yup from "yup";
import { Field, Formik } from "formik";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

export default function Transferencia(User) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const defaultValue = 0;
    const[wallet, setWallet] = useState(defaultValue);

    const id = sessionStorage.getItem("ID")
    const site = "/user/getuserbyid/userId/" + id
    const nome = User.User.name

    
    const handleFormSubmit = (values) => {
        const description = "ID: " + id + " Manda " + values.envio + " para  ID: " + User.User.idUser
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

        const TransactionBody = {
            amount: values.envio,
            description: description,
            idDestinationAccount: User.User.idUser,
            idOriginAccount: parseInt(id),
            idTransaction: 0,
            transactionDate: date,
            transactionType: "Envio"
        }

        console.log(TransactionBody)

        api
        .post("/transaction/createDeposit", TransactionBody)
        .then(() => console.log("Success"))
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
        handleClose();

    };


    useEffect(() => {
        api
        .get(site)
        .then((response) =>  response.data.wallet)
        .then((response) => setWallet(response))
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
        <div>
        <Button variant="contained" onClick={handleOpen}>Transferir</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2>Quantas Moedas Deseja Transferir?</h2>
                <h3>Seu Saldo: R$ {wallet}</h3>
                <h3>Envio para: {nome}</h3>

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
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Quantidade de Moedas"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.envio}
                                name="envio"
                                error={!!touched.envio && !!errors.envio}
                                helperText={touched.envio && errors.envio}
                                sx={{ gridColumn: "span 1" }}
                            />

                            <Box
                                sx={{
                                    textAlign: "center",
                                }}
                                mt="30px"
                            >
                                <Button type="submit" color="secondary" variant="contained">
                                    Mandar Moedas
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Modal>
        </div>
    );
}

const checkoutSchema = yup.object().shape({
    envio: yup.number().min(1, 'Quantidade Invalida').max(1000, 'Quantidade Invalida').required("Requirido"),
  });
  
  const initialValues = {
    envio: ""
  };
  