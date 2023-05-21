import { useState } from "react";
import "./styles.css";
import { Link, Router, Routes, Route, useNavigate, Navigate, useLocation, Switch, Redirect } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import LayoutSidebar from "./components/Sidebar/Sidebar";
//import { AuthProvider } from "./service/AuthProvider";
//import useAuth from "./service/useAuth";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./pages/Login/index"
import Dashboard from "./pages/dashboard";
//import PrivateRoute from "./service/PrivateRoute";
import Usuarios from "./pages/Usuarios";
import ThirdParty from "./pages/ThirdParty";
import Institution from "./pages/Institution";
import Teachers from "./pages/Teachers";
import CreateAdvantage from "./pages/CreateAdvantage";
import Alunos from "./pages/Alunos";

export default function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    const PrivateRoute = ({ children }) => {
        const userIsLogged = sessionStorage.getItem("authenticated");
      
        if (!userIsLogged) {
          return <Login />;
        }
      
        return children;
      };

        return (
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                        <div className="app">
                            <PrivateRoute>
                                <LayoutSidebar isSidebar={isSidebar} />
                                <main className="content">
                                    <Topbar setIsSidebar={setIsSidebar} />
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/Usuarios" element={<Usuarios />} />
                                        <Route path="/Login" element={<Login />} />
                                        <Route path="/ThirdParty" element={<ThirdParty />} />
                                        <Route path="/Institution" element={<Institution />} />
                                        <Route path="/Teachers" element={<Teachers />} />
                                        <Route path="/CreateAdvantage" element={<CreateAdvantage />} />
                                        <Route path="/Alunos" element={<Alunos />} />
                                    </Routes>
                                </main>
                            </PrivateRoute>
                        </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        );
}