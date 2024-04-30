import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import "./index.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Applications,
  Details,
  Home,
  Jobs,
  Login,
  MyApplication,
  Myjobs,
  Notfound,
  Postjob,
  Register,
  Root,
} from "./index.js";

export const Context = createContext({ isAuthorized: false });


const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};
// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "job/getall",
        element: <Jobs />,
      },
      {
        path: "job/:id",
        element: <Details />,
      },
      {
        path: "job/post",
        element: <Postjob />,
      },
      {
        path: "job/me",
        element: <Myjobs />,
      },
      {
        path: "application/:id",
        element: <Applications />,
      },
      {
        path: "application/me",
        element: <MyApplication />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <AppWrapper />
  </React.StrictMode>
);
