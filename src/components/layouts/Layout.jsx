import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Home/Shared/Navbar";

const Layout = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <div style={{ height: "93%" }} className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
