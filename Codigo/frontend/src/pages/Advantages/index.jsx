import { useTheme } from "@mui/material";
import { ColorTokens } from "../../theme";
import { Box, Card, CardActions, CardContent, CardMedia, Button, Typography   } from "@mui/material";
import Header from "../../components/Header/Header";
import Cards from "../../components/Cards";

const Advantage = () => {
    const theme = useTheme();
    const colors = ColorTokens(theme.palette.mode);


    return (
    <Box m="20px">
        <Header title="Vantagems" subtitle="Aqui esta todas as Vantagems" />
        
        <Box 
            sx={{
                width: "100%",
                height: "auto",
            }}
        >
            <Cards />
        </Box>
      </Box>
    )
}

export default Advantage;