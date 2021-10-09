import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import React from "react";

const activeNavLinkStyle = {
  color: "var(--chakra-colors-blue-300)",
  textDecoration: "underline",
};


export const NavLink: React.FC<NavLinkProps> = ({ children, to, exact = false }) => {
  return (
    <Link as={RouterNavLink} to={to} exact={exact} activeStyle={activeNavLinkStyle}>
      {children}
    </Link>
  );
};
