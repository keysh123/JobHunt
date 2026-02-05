import React from "react";
import Navbar from "./components/components_lite/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/authetication/Login";
import Register from "./components/authetication/Register";
import Home from "./components/components_lite/Home";

const App = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <>
     <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
};

export default App;
