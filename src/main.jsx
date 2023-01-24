import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

if (!localStorage.getItem('token')) {
    const token = window.prompt("Introduzca el token");
    localStorage.setItem("token", JSON.stringify(token));
    const user = window.prompt("Intruduzca el usuario");
    localStorage.setItem("user", JSON.stringify(user));
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
