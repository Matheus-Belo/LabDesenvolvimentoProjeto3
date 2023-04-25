import { useTheme } from "@mui/material";
import { ColorTokens } from "../../theme";

const Dashboard = () => {
  const theme = useTheme();
  const colors = ColorTokens(theme.palette.mode);

  return (
    <h1>Test</h1>
  );
};

export default Dashboard;
