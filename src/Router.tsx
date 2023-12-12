import { createBrowserRouter } from "react-router-dom";
import About from "./screens/About";
import Home from "./screens/Home";
import App from "./App";
import NotFound from "./screens/NotFoutd";
import ErrorComponent from "./components/ErrorComponent";
import User from "./screens/users/User";
import Followers from "./screens/users/Followers";

// "/" -> 부모, /about -> 자식
const Router = createBrowserRouter([
  {
    path: "/", // 부모
    element: <App />,
    children: [
      {
        path: "", // "/" 는 기본으로 깔고 가는 것., 자식
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "about", // 자식
        element: <About />,
      },
      {
        // 다이나믹 url, 자식
        path: "users/:userId",
        element: <User />,
        children: [
          {
            path: "followers", // users/:userId의 자식
            element: <Followers />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default Router;
