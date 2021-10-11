import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MainLayout } from "layouts";
import { Routes } from "routes";
import { useDispatch } from "react-redux";
import { signIn } from "services/slices/user";

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageAuthState = localStorage.getItem("isAuthenticated");
    if (localStorageAuthState === "true") {
      dispatch(signIn());
    }
  }, []);

  return (
    <Router>
      <MainLayout>
        <Routes />
      </MainLayout>
    </Router>
  );
};
