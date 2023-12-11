import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import Router from "./Router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <RouterProvider router={Router} />
    </ThemeProvider>
  </React.StrictMode>
);
