import { Box, useTheme, Container, Unstable_Grid2 as Grid  } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../services/API/api";
import {OverviewBudget} from "../Saldo"
import { ColorTokens } from "../../theme";


import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

const Extrato = () => {
    const theme = useTheme();
    const colors = ColorTokens(theme.palette.mode);

    const [UserData, setUserData] = useState([])

    const defaultValue = 0;
    const[wallet, setWallet] = useState(defaultValue);

    const id = sessionStorage.getItem("ID")
    const site = "/user/getuserbyid/userId/" + id

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
        <Box>
            <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                
            >
                <Grid
                    sx={{
                        backgroundColor: colors.background,
                        alignItems: "center",
                        boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)",
                        borderRadius: '35px'
                    }}
                >
                    <OverviewBudget
                        value={wallet}
                    >

                    </OverviewBudget>
                </Grid>
                <Grid
                >

                </Grid>
                <Grid

                >
                    
                </Grid>
            </Box>
        </Box>
    )
}

export default Extrato;