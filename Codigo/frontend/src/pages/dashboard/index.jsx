import { useTheme } from "@mui/material";
import { ColorTokens } from "../../theme";
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";

const Dashboard = () => {
  const theme = useTheme();
  const colors = ColorTokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Bem-Vindo" subtitle="Bem-vindo a sua conta" />
      
      <Box 
          sx={{
              boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)",
              textAlign: "center",
              width: "100%",
              height: "auto",
              backgroundColor: "#111",
          }}
      >
        <h1>Hello Gud Day Mate</h1>
      </Box>
    </Box>
  );
};

export default Dashboard;
