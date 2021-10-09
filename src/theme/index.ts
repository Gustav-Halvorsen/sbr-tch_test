import { extendTheme } from "@chakra-ui/react";

export const defaultTheme = extendTheme({
  styles: {
    global: {
      body: {
        color: "gray.600",
        h: "100vh",
        bg: "gray.50",
      },
      a: {
        color: "blue.500",
        _hover: {
          textDecoration: "underline",
        },
        ".active": {
          color: "red"
        }
      },
    },
  },
  components: {
    Link: {
      ".active": {
        color: "red"
      }
    }
  }
});
