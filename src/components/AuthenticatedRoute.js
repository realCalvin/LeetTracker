import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AuthenticatedRoute({
  component: Component,
  appProps,
  ...rest
}) {
  return (
    <div>
      <Navbar />
      <Route
        {...rest}
        render={props =>
          appProps.isAuthenticated ? (
            <Component {...props} {...appProps} />
          ) : (
            <Redirect to={`/?redirect=signin`} />
          )
        }
      />
    </div>
  );
}
