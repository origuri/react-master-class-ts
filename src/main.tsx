import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";

// theme들의 key값을 항상 같아야 함
const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};
const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* app을 감싸고 있기 때문에 app이하의 컴포넌트들은 공통으로 사용 가능 */}
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
