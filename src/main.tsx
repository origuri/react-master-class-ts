import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme.ts";

import { RouterProvider } from "react-router-dom";
import Router from "./Router.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* themeProvider가 App(RouterProvider)를 감싸고 있기 때문에 App.js의
    globalCss에 theme을 적용할 수 있음.  */}
    <ThemeProvider theme={theme}>
      {/* ThemeProvider에 줄 필요는 없으니 바로 감싸준다 */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
