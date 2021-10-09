import React from "react";
import { Header } from "components";
import { Box } from "@chakra-ui/react";

const mainLayoutShadow = `
  0px 0px 2.1px -10px rgba(0, 0, 0, 0.022),
  0px 0px 5.3px -10px rgba(0, 0, 0, 0.031),
  0px 0px 10.8px -10px rgba(0, 0, 0, 0.039),
  0px 0px 22.3px -10px rgba(0, 0, 0, 0.048),
  0px 0px 61px -10px rgba(0, 0, 0, 0.07)
`;

export const MainLayout: React.FC = ({ children }) => {
  return (
    <Box maxW={1280} w="100%" bg="white" h="100vh" m="0 auto" px={8} boxShadow={mainLayoutShadow}>
      <Header />
      {children}
    </Box>
  );
};
