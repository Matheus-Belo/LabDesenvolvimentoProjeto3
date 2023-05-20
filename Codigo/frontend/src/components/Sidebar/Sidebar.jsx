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

  const role = sessionStorage.getItem("Role"); //Aqui vai verificar qual o tipo de usuário que está logado
  //Caso for Admin vai ter acesso a todos os menus
  //Caso for Aluno, vai ter acesso a o seu dashboard, os items que podem ser comprados, e o seu perfil
  //Caso for Professor, vai ter acesso a o seu dashboards e os alunos que ele pode mandar as moedas
  //Caso for Instituição Educacional, tera acesso a o criar professores
  //Caso for Instituição Empresa, tera acesso a criar vantagems

  if(role === "ADMIN"){
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
              <MenuItem
                  component={<Link to="/" />}
                >
                  Menu Principal
                </MenuItem>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Painel Admin
              </Typography>
                <MenuItem
                  component={<Link to="/Usuarios" />}
                >
                  Usuarios
                </MenuItem>

                <MenuItem
                  component={<Link to="/ThirdParty" />}
                >
                  Empresas Parceiras
                </MenuItem>
                <MenuItem
                  component={<Link to="/Institution" />}
                >
                  Instituição Educacional
                </MenuItem>
                <MenuItem
                  component={<Link to="/Teachers" />}
                >
                  Professores
                </MenuItem>
                <MenuItem
                  component={<Link to="/Alunos" />}
                >
                  Alunos
                </MenuItem>
                <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Vantagems
              </Typography>
                <MenuItem
                  component={<Link to="/Advantage" />}
                >
                  Vantagems
                </MenuItem>
                <MenuItem
                  component={<Link to="/CreateAdvantage" />}
                >
                  Criar Vantagems
                </MenuItem>
            </Box>
          </Menu>
        </Sidebar>
      </Box>
    );
  }else if(role === "PROFESSOR"){
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
              <MenuItem
                  component={<Link to="/" />}
                >
                  Menu Principal
                </MenuItem>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Painel Professor
              </Typography>
                <MenuItem
                  component={<Link to="/Alunos" />}
                >
                  Alunos
                </MenuItem>
            </Box>
          </Menu>
        </Sidebar>
      </Box>
    );
  }
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