import { createBrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import App from "./App";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "price",
            element: <Price />,
          },
          {
            path: "chart",
            element: <Chart />,
          },
        ],
      },
    ],
  },
]);

export default Router;
