import { ColorTokens } from "../../theme";
import { Box, Card, CardActions, CardContent, CardMedia, Button, Typography   } from "@mui/material";
import Header from "../../components/Header/Header";
import React, { useEffect, useState } from "react";
import api from "../../services/API/api";
import Alert from '@mui/material/Alert';


const Cards = () => {

    const defaultValue = 0;
    const[wallet, setWallet] = useState(defaultValue);
    const [errorMessage, setErrorMessage] = React.useState("");

    const Compra = (id, preco, empresa) => {
        walletCheck();
        if(wallet > preco){
            const description = "Compra da Vantagem"
            const current = new Date();
            const idUser = sessionStorage.getItem("ID")

            const TransactionBody = {
                amount: preco,
                description: description, 
                idDestinationAccount: empresa,
                idOriginAccount: parseInt(idUser),
                idTransaction: 0,           
                itemCode: id,
            }

            api
                .post("/transaction/createSale", TransactionBody)
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
        }else{
            setErrorMessage(
                <Alert  
                    severity="error"
                >
                    Voce não tem saldo o suficiente
                </Alert>
            )
        }
    }

    const walletCheck = () => {
        const id = sessionStorage.getItem("ID")
        const site = "/user/getuserbyid/userId/" + id
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
    }; 
    const [Data, setData] = useState([])

      useEffect(() => {
        api
          .get("/advantages/page/0/size/10")
          .then((response) =>  response.data.content)
          .then((response) => Available(response))
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

        const Available = (valor) => {
            var arr = []
            
            for(let i = 0; i < valor.length; i++){
                if(valor[i].status == "AVAILABLE"){
                    arr.push(valor[i])
                }
            }

            setData(arr)
        }


        let str = [];

        for(let i = 0; i < Data.length; i++){

            let frase = Data[i].advantageDescription
            let disc = frase.split("<br>")

            str.push( 
                <Card 
                    sx={{ 
                        maxWidth: 345,
                        boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)",
                        borderRadius: "10px",
                        height:"auto"
                    }}
                >
                    <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {Data[i].advantageName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Preço: {Data[i].price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {disc[0]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {disc[1]}
                        </Typography>
                    </CardContent>
                    <CardActions>
                            {errorMessage && <div className="error"> {errorMessage} </div>}
                        <Button variant="contained" sx={{width: "100%"}} onClick={() =>Compra(Data[i].idAdvantages, Data[i].price, Data[i].thirdParty.idThirdParty)}>Comprar</Button>
                    </CardActions>
                </Card>
            )
        }

    return(
        <>
            <Box
                sx={{
                    gridColumn: "span 1",
                }}
            >
                {str}
            </Box>
        </>
    )
}

export default Cards;
