import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme.ts";

import { RouterProvider } from "react-router-dom";
import Router from "./Router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* themeProvider가 App(RouterProvider)를 감싸고 있기 때문에 App.js의
    globalCss에 theme을 적용할 수 있음.  */}
    <ThemeProvider theme={theme}>
      <RouterProvider router={Router} />
    </ThemeProvider>
  </React.StrictMode>
);
