import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Home from "../components/pages/Home/Home";
import Signup from "../components/pages/SignUP/Signup";
import Private from "../components/pages/Private/Private";
import Login from "../components/pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="h-screen">
        <Layout />
      </div>
    ),
    children: [
      {
        path: "/",
        element: (
          <Private>
            <Home />
          </Private>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
