import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/authetication/Login";
import Register from "./components/authetication/Register";
import Home from "./components/components_lite/Home";
import Jobs from "./components/components_lite/Jobs";
import Layout from "./components/components_lite/Layout";
import Browse from "./components/components_lite/Browse";
import Profile from "./components/components_lite/Profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/jobs", element: <Jobs /> },
      {path: "/browse" , element : <Browse/>},
      {path: "/profile" , element : <Profile/>}
    ]
  }
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;