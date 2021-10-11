import React from "react";
import { Route, Switch } from "react-router-dom";
import { AboutPage, DictionaryPage, HomePage, LoginPage, NotFoundPage } from "pages";
import { ProtectedRoute } from "./protected-route";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <ProtectedRoute path="/dictionary" component={DictionaryPage} />
      <Route path="/about" exact component={AboutPage} />
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
