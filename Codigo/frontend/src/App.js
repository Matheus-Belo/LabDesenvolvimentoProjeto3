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

export default function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    const PrivateRoute = ({ children }) => {
        const userIsLogged = sessionStorage.getItem("authenticated");// Your hook to get login status
      
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
                                    </Routes>
                                </main>
                            </PrivateRoute>
                        </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        );
}

/**
 * if(localStorage.getItem("token") != null){
        return (
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {withAuth(
                        <div className="app">
                            <LayoutSidebar isSidebar={isSidebar} />
                            <main className="content">
                                <Topbar setIsSidebar={setIsSidebar} />
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/RegisterUser" element={<RegisterUser />} />
                                    <Route path="/CreateUsers" element={<Users />} />
                                    <Route path="/ListUsers" element={<UserTable />} />
                                    <Route path="/Login" element={<Login />} />
                                    <Route path="/EditUsers" element={<EditUsers />} />
                                    <Route path="/CreateThirdParty" element={<ThirdParty />} />
                                    <Route path="/ListThirdParty" element={<ThirdPartyTable />} />
                                </Routes>
                            </main>
                        </div>
                    )}
                    <div className="app">
                        <LayoutSidebar isSidebar={isSidebar} />
                        <main className="content">
                            <Topbar setIsSidebar={setIsSidebar} />
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/RegisterUser" element={<RegisterUser />} />
                                <Route path="/CreateUsers" element={<Users />} />
                                <Route path="/ListUsers" element={<UserTable />} />
                                <Route path="/Login" element={<Login />} />
                                <Route path="/EditUsers" element={<EditUsers />} />
                                <Route path="/CreateThirdParty" element={<ThirdParty />} />
                                <Route path="/ListThirdParty" element={<ThirdPartyTable />} />
                            </Routes>
                        </main>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
 */