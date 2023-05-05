import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  if (loading) {
    return <h1 className="text-5xl text-center my-16">Loading .......</h1>;
  } else {
    return user ? <>{children}</> : <Navigate to="/login" />;
  }
};

export default Private;
