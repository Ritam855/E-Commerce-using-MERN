import React, {Fragment} from 'react';
import { Link, useLocation,useNavigate} from 'react-router-dom';
import {signout, isAuthenticated} from "../auth/helper";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (pathname) => {
    return location.pathname === pathname ? 'text-success' : 'text-white';
  };

  return (
        <div>
          <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${isActive('/')}`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/cart"
                className={`nav-link ${isActive('/cart')}`}
              >
                Cart
              </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
              <Link
                to="/user/dashboard"
                className={`nav-link ${isActive('/dashboard')}`}
              >
                Dashboard
              </Link>
            </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                          <li className="nav-item">
                          <Link
                            to="/admin/dashboard"
                            className={`nav-link ${isActive('/admin')}`}
                          >
                            Admin Dashboard
                          </Link>
                        </li>
            )}
            {!isAuthenticated() && (
                          <Fragment>
                          <li className="nav-item">
                            <Link
                              to="/signup"
                              className={`nav-link ${isActive('/signup')}`}
                            >
                              Signup
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="/signin"
                              className={`nav-link ${isActive('/signin')}`}
                            >
                              Signin
                            </Link>
                          </li>
                          </Fragment>
            )}
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  window.location.href("/");
                });
              }}
            >
              Signout
            </Link>
          </li>
        )}
          </ul>
        </div>
  );
};

export default Menu;
