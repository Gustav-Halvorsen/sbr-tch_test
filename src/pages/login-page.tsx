import React, { useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { TStore } from "services/store";
import { TLocationState } from "types";

import {
  Box,
  Flex,
  Heading,
  chakra,
  Input,
  FormControl,
  FormLabel,
  Button,
  Text,
  CloseButton,
} from "@chakra-ui/react";

import { signIn } from "services/slices/user";

export const LoginPage: React.FC = () => {
  const [signInData, setSignInData] = useState({
    login: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { authorized } = useSelector((state: TStore) => state.authReducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const { state: locationState } = useLocation<TLocationState>();

  const handleGoBack = (): void =>
    history.push(locationState?.redirectedFrom || "/");

  const isFormValid = (): boolean => {
    const { login, password } = signInData;
    return login === "Admin" && password === "12345";
  };

  const validateForm = async (): Promise<string> => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isFormValid()) {
          resolve("valid");
        } else {
          reject("Имя пользователя или пароль введены неверно");
        }
      }, 500);
    });
  };
  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name } = evt.target;
    if (error) {
      setError(null);
    }
    setSignInData((prevData) => ({
      ...prevData,
      [name]: evt.target.value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      const validationResult = await validateForm();
      if (validationResult === "valid") {
        if (error) {
          setError(null);
        }
        setIsSubmitting(false);
        localStorage.setItem("isAuthenticated", "true");
        dispatch(signIn());
      }
    } catch (e) {
      setError(e as string);
      setIsSubmitting(false);
    }
  };

  if (authorized) {
    return <Redirect to={locationState?.from || "/"} />;
  }
  return (
    <>
      <Box
        boxShadow="base"
        bg="white"
        p="6"
        border="1px solid"
        borderColor="gray.50"
        borderRadius="sm"
        w={["95%", "80%", "60%", "50%", "35%"]}
        zIndex={3}
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%);"
      >
        <chakra.form>
          <Heading as="h2" size="lg" mb={6}>
            Вход
          </Heading>
          <CloseButton
            size="lg"
            position="absolute"
            right={5}
            top={5}
            onClick={handleGoBack}
          />
          <Flex direction="column">
            <FormControl id="username" mb={4} isRequired>
              <FormLabel>Имя пользователя</FormLabel>
              <Input
                type="text"
                name="login"
                size="lg"
                value={signInData.login}
                disabled={isSubmitting}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Пароль</FormLabel>
              <Input
                type="password"
                name="password"
                size="lg"
                value={signInData.password}
                disabled={isSubmitting}
                onChange={handleInput}
              />
            </FormControl>
            {error && (
              <Text color={"red.500"} textAlign={"center"} mt={4}>
                {error}
              </Text>
            )}
            <Button
              colorScheme="blue"
              minW="30%"
              ml="auto"
              mt={8}
              size="lg"
              isLoading={isSubmitting}
              disabled={
                signInData.login === "" ||
                signInData.password === "" ||
                isSubmitting
              }
              onClick={handleSubmit}
              type="submit"
            >
              Войти
            </Button>
          </Flex>
        </chakra.form>
      </Box>
      <Box
        zIndex={2}
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        bg="hsla(0, 0%, 0%, 0.6);"
        onClick={handleGoBack}
      />
    </>
  );
};
