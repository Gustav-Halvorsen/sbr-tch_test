import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { TStore } from "services/store";
import { TLocationState } from "types";

type TProtectedRouteProps = RouteProps & {
  component: JSX.Element | React.FC;
};

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { authorized } = useSelector((state: TStore) => state.authReducer);
  const location = useLocation();
  const state = location.state as TLocationState;

  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location, redirectedFrom: state?.from },
            }}
          />
        )
      }
    />
  );
};
