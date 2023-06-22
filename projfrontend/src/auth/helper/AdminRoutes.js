import React from "react";
import { Route, Navigate  } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ children }) => {
  if(isAuthenticated() && isAuthenticated().user.role=== 1)
  {
    return children;
  }
  return <Navigate to="/signin" replace />

};

export default AdminRoute;