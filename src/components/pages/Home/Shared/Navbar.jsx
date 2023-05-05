import React, { useContext, useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div
      style={{ minHeight: "4%" }}
      className="sticky overflow-hidden top-0 z-10 flex items-center justify-between bg-gray-900 text-white px-4 py-2"
    >
      <div className="flex items-center gap-2">
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "2px solid rgb(0,200,0)",
          }}
          className="overflow-hidden rounded-full items-center justify-center"
        >
          {user?.photoURL ? (
            <img
              style={{ width: "40px", height: "40px" }}
              className="rounded-full mr-4"
              src={user?.photoURL}
              alt={user?.displayName}
            />
          ) : (
            <FaUserCircle style={{ width: "40px", height: "40px" }} />
          )}
        </div>
        <h1 className="text-lg font-bold">{user?.displayName}</h1>
      </div>
      <div className="flex items-center">
        {user ? (
          <button
            onClick={logOut}
            className="px-4 py-2 bg-black text-white rounded cursor-pointer"
          >
            Log Out
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-black text-white rounded cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
