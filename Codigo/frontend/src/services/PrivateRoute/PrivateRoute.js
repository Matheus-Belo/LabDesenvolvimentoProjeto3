import React from 'react'
import AuthService from './Services/AuthService'
import { Redirect, Route } from 'react-router-dom'

    const PrivateRoute: FC<{ children: React.ReactElement }> = ({ children }) => {
        const userIsLogged = useLoginStatus(); // Your hook to get login status
     
        if (!userIsLogged) {
           return <LoginPage />;
        }
        return children;
     };


export default PrivateRoute