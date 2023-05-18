import { Box,useTheme, Grid } from "@mui/material";
import Header from "../../components/Header/Header";

const CreateAdvantage = () => {
    return (
        <Box
            sx={{
                border: "1px solid black",
            }}
            m="20px"
        >
            <Header title="Criação das Vantagens" subtitle="Aqui você pode Criar, Visualizar, Editar as suas vantagems" />
        </Box>
    )
}

export default CreateAdvantage;