import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Box, useTheme, Avatar, Card, CardContent, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid  } from '@mui/material';
import React, { useEffect, useState } from "react";
import api from "../../services/API/api";
import { ColorTokens } from "../../theme";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export const OverviewBudget = (props) => {
    const theme = useTheme();
    const colors = ColorTokens(theme.palette.mode);
    const { difference, positive = false, sx, value } = props;

  return (
    <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gridAutoRows="140px"  
        
    >
        <Grid
            sx={{
                backgroundColor: colors.primary[800],
                textAlign: "center",
                height: "100%",
                borderTop: 1,
                borderLeft: 1,
                borderRight: 0.1,
                borderBottom: 1,
                borderRadius: '35px 0 0 35px'
            }}
            display="flex"
            justifyContent="center"
            textAlign= "center"
            alignItems="center"
        >
            <Avatar
                sx={{
                    backgroundColor: 'success.main',
                    height: 106,
                    width: 106
                }}
            >
                <SvgIcon fontSize='large' alignItems = "center">
                    <CurrencyExchangeIcon 
                        fontSize='inherit'
                    />
                </SvgIcon>
            </Avatar>
        </Grid>
        <Grid
            sx={{
                backgroundColor: colors.background,
                height: "100%",
                textAlign: "center",
                borderTop: 1,
                borderBottom: 1,
            }}
            display="flex"
            justifyContent="center"
            textAlign= "center"
            alignItems="center"
        >
            <Typography variant="h3">
                R$ {value}
            </Typography>

        </Grid>
        <Grid
            sx={{
                backgroundColor: colors.background,
                height: "100%",
                textAlign: "center",
                borderTop: 1,
                borderRight: 1,
                borderBottom: 1,
                borderRadius: '0 35px 35px 0'
            }}
            display="flex"
            justifyContent="center"
            textAlign= "center"
            alignItems="center"
        >

            <Typography
                color="text.secondary"
                variant="overline"
                sx={{
                    fontSize: 20
                }}
            >
                Saldo
            </Typography>
            
        </Grid>
    </Box>
  );
};

OverviewBudget.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};