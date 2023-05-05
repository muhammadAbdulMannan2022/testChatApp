import React from "react";
import ReactDOM from "react-dom/client";
import router from "./routes/routes";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./components/Providers/AuthProvider";
import Funcrions from "./components/Providers/Functions";
import Functions from "./components/Providers/Functions";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Functions>
        <RouterProvider router={router} />
      </Functions>
    </AuthProvider>
  </React.StrictMode>
);
