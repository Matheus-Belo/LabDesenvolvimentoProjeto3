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
        gap="5px"    
        
    >
        <Grid
            sx={{
                backgroundColor: colors.background,
                textAlign: "center",
                height: "100%",
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
            }}
            display="flex"
            justifyContent="center"
            textAlign= "center"
            alignItems="center"
        >
            <Typography variant="h2">
                R$ {value}
            </Typography>

        </Grid>
        <Grid
            sx={{
                backgroundColor: colors.background,
                height: "100%",
                textAlign: "center",
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

/**
 * <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
            <Avatar
                sx={{
                    backgroundColor: 'error.main',
                    height: 106,
                    width: 106
                }}
            >
                <SvgIcon>
                <CurrencyDollarIcon />
                </SvgIcon>
          </Avatar>
            <Stack spacing={1}>
                <Typography
                    color="text.secondary"
                    variant="overline"
                    sx={{
                        fontSize: 20
                    }}
                >
                Saldo
                </Typography>
                <Typography variant="h4">
                    R$ {value}
                </Typography>
            </Stack>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
            </Stack>
          </Stack>
        )}
      </CardContent>
    </Card>
 */