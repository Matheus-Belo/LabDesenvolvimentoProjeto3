import { ColorTokens } from "../../theme";
import { Button } from "@mui/material";
import Header from "../../components/Header/Header";
import React, { useEffect, useState } from "react";
import api from "../../services/API/api";
import Alert from '@mui/material/Alert';

const PDFDownload = () => {

    var link = "/transaction/getExtractAsPDF/idConta/" + sessionStorage.getItem("ID")

    const BaixarPDF = () => {
      api 
        .get(link)
        .then(response => ConvertPDF(response.data))
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

    const ConvertPDF = (data) => {
      var blob = new Blob([data], { type: 'application/pdf' });
      console.log(blob)

      var downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'Extrato.pdf';

      // Trigger the download
      downloadLink.click();
    };

    

    return(
        <>
            <Button variant="contained" onClick={BaixarPDF}
            >
                Baixar Extrato PDF
            </Button>
        </>
    )
}

export default PDFDownload;
