import { useTheme } from "@mui/material";
import { ColorTokens } from "../../theme";
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import Extrato from "../../components/Extrato";
import ExtratoTable from "../../components/ExtratoTable";
import PDFDownload from "../../components/PDFDownloader";

const Dashboard = () => {
  const theme = useTheme();
  const colors = ColorTokens(theme.palette.mode);

  const role = sessionStorage.getItem("Role");

  if(role === "ADMIN" || role === "ALUNO" || role === "PROFESSOR") {
    return (
      <Box m="20px">
        <Header title="Bem-Vindo" />
        
        <Box 
            sx={{
                width: "100%",
                height: "auto",
            }}
        >
            <Extrato />
            <PDFDownload />
            <ExtratoTable />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box m="20px">
        <Header title="Bem-Vindo" />
        
        <Box 
            sx={{
                boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)",
                width: "100%",
                height: "auto",
            }}
        >
        </Box>
      </Box>
    );
  }
};

export default Dashboard;
