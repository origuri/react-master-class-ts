import { createBrowserRouter } from "react-router-dom";
import About from "./screens/About";
import Home from "./screens/Home";
import App from "./App";
import NotFound from "./screens/NotFoutd";
import ErrorComponent from "./components/ErrorComponent";

// "/" -> 부모, /about -> 자식
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "", // "/" 는 기본으로 깔고 가는 것.
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default Router;
