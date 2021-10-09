import React from "react";
import { Stack, chakra } from "@chakra-ui/react";
import { NavLink } from "components";
import { useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <chakra.header py={6}>
      <Stack direction={["column", "row"]} spacing="24px">
        <NavLink
          to={{ pathname: "/", state: { from: location.pathname } }}
          exact
        >
          На главную
        </NavLink>
        <NavLink
          to={{ pathname: "/dictionary", state: { from: location.pathname } }}
          exact
        >
          Справочники
        </NavLink>
        <NavLink
          to={{ pathname: "/about", state: { from: location.pathname } }}
          exact
        >
          О приложении
        </NavLink>
      </Stack>
    </chakra.header>
  );
};
