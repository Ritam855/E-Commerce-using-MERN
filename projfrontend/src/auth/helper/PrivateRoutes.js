import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({children }) => {
  if(isAuthenticated())
  {
    return children;
  }
  return <Navigate to="/signin" replace />
};

export default PrivateRoute;



