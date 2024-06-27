import React from "react";
import ReactDOM from "react-dom/client"; // Make sure you import ReactDOM
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Saved from "./saved";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/saved",
    element:<Saved/>
  }
]);
const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
