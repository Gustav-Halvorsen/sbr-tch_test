import React from "react";
import { Stack, chakra, Button, Flex } from "@chakra-ui/react";
import { NavLink } from "components";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TStore } from "services/store";
import {signOut} from "services/slices/user";

export const Header: React.FC = () => {
  const { authorized } = useSelector((state: TStore) => state.authReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSignOut = (): void => {
    localStorage.removeItem("isAuthenticated");
    dispatch(signOut());
  };

  return (
    <chakra.header py={6} px={8} mx={-8} mb={6} boxShadow="sm">
      <Flex
        justify={{
          base: "flex-start",
          md: "space-between",
        }}
        align={{
          base: "flex-start",
          md: "center",
        }}
        direction={{
          base: "column",
          md: "row",
        }}
      >
        <Stack direction={{ base: "column", md: "row" }} spacing="24px">
          <NavLink to={{ pathname: "/", state: { from: location.pathname } }} exact>
            На главную
          </NavLink>
          <NavLink to={{ pathname: "/dictionary", state: { from: location.pathname } }} exact>
            Справочники
          </NavLink>
          <NavLink to={{ pathname: "/about", state: { from: location.pathname } }} exact>
            О приложении
          </NavLink>
        </Stack>
        {authorized && (
          <Button
            onClick={handleSignOut}
            mt={{
              base: 4,
              md: 0,
            }}
          >
            Выйти
          </Button>
        )}
      </Flex>
    </chakra.header>
  );
};
