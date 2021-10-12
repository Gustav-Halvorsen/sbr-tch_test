import React from "react";
import { Link } from "react-router-dom";
import { Center, Flex, Heading, Text } from "@chakra-ui/react";

export const NotFoundPage: React.FC = () => {
  return (
    <Center h={{
      base: "calc(100vh - 272px)",
      md: "calc(100vh - 136px)"
    }}>
      <Flex direction="column" align="center" justify="center">
        <Text fontSize="8xl">&#128064;</Text>
        <Heading as="h2" size="lg" fontWeight={300} mb={10}>
          Такая страница не найдена
        </Heading>
        <Link to="/">Вернуться на главную</Link>
      </Flex>
    </Center>
  );
};
