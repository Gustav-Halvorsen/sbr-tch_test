import React from "react";
import ReactDOM from "react-dom";

// import { theme } from "@chakra-ui/theme";
import { ChakraProvider, ColorModeScript, Grid } from "@chakra-ui/react";
import { App } from "./components";
import { defaultTheme } from "./theme";
import { store } from "./services/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={defaultTheme}>
      <ColorModeScript initialColorMode="light" />
      <Grid
        h="100vh"
        templateRows="auto 1fr auto"
        templateColumns="1fr"
        gap={4}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Grid>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
