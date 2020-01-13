import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function UnauthenticatedRoute({
  component: Component,
  appProps,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        !appProps.isAuthenticated ? (
          <Component {...props} {...appProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}
