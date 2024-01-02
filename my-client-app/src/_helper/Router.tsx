import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { List } from "../user/List";
import { Dashboard } from "../home/Dashboard";
import { Details } from "../user/Details";
import { ErrorPage } from "./Errors";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <List />,
        children: [
          {
            path: "/users/:id",
            element: <Details />,
          },
        ],
      },
      {
        path: "/errors",
        element: <ErrorPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
