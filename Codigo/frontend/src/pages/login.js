import * as React from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation
} from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Test Login</h1>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};