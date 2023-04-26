import { useState } from "react";
import { useProSidebar, Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { ColorTokens } from "../../theme";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

/** 
const Item = ({ title, to, icon, selected, setSelected, text }) => {
  const theme = useTheme();
  const colors = ColorTokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[200],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

*/

const LayoutSidebar = () => {
  const theme = useTheme();
  const { collapseSidebar, toggleSidebar, toggled, broken, rtl } = useProSidebar();
  const colors = ColorTokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          height: '100% !important'
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar backgroundColor={
          "rgb(255,255,255,0.05)"
        } rootStyles ={{
          height: "100%",
          border: "none",
        }}
      >
        <Menu iconShape="square">
          <Box
            display="flex"
            alignItems="center"
            textAlign={"center"}
            ml="15px"
          >
            <Typography variant="h3" color={colors.grey[100]}>
              ADMINS
            </Typography>
          </Box>

          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={`../../assets/user.png`}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                Admin
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                VP Fancy Admin
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Usuarios
            </Typography>
              <MenuItem
                component={<Link to="/CreateUsers" />}
              >
                Criar Usuarios
              </MenuItem>
              <MenuItem
                component={<Link to="/ListUsers" />}
              >
                Tabela Usuarios
              </MenuItem>

            <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
            >
              Empresas  
            </Typography>

              <MenuItem
                component={<Link to="/CreateThirdParty" />}
              >
                Criar Empresas
              </MenuItem>
              <MenuItem
                component={<Link to="/ListThirdParty" />}
              >
                Tabela Empresas
              </MenuItem>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default LayoutSidebar;
/**
 * <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()}>Collapse</button>
      </main>
    </div>
 */