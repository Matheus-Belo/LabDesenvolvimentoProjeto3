import { useState } from "react";
import "./styles.css";
import { Link, Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import LayoutSidebar from "./components/Sidebar/Sidebar";
//import { AuthProvider } from "./service/AuthProvider";
//import useAuth from "./service/useAuth";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Users from "./pages/CreateUsers"
import UserTable from "./pages/TabelaUsers";
import EditUsers from "./pages/EditUser";
import ThirdPartyTable from "./pages/TabelaThird";
import EditThirdParty from "./pages/EditThird";
import ThirdParty from "./pages/CreateThird"

import Dashboard from "./pages/dashboard";

export default function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <LayoutSidebar isSidebar={isSidebar} />
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/CreateUsers" element={<Users />} />
                            <Route path="/ListUsers" element={<UserTable />} />
                            <Route path="/EditUsers" element={<EditUsers />} />
                            <Route path="/CreateThirdParty" element={<ThirdParty />} />
                            <Route path="/ListThirdParty" element={<ThirdPartyTable />} />
                        </Routes>
                        
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}