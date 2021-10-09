import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { MainLayout } from "layouts";

type TMainLayoutRouteProps = RouteProps & {
  component: JSX.Element | React.FC;
};

export const MainLayoutRoute: React.FC<TMainLayoutRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <MainLayout>
          <Component {...props} />
        </MainLayout>
      )}
    />
  );
};
