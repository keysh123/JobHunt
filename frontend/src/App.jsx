import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/authetication/Login";
import Register from "./components/authetication/Register";
import Home from "./components/components_lite/Home";
import Jobs from "./components/components_lite/Jobs";
import Layout from "./components/components_lite/Layout";
import Browse from "./components/components_lite/Browse";
import Profile from "./components/components_lite/Profile";
import Description from "./components/components_lite/Description";
import ProtectedRoute from "./components/components_lite/ProtectedRoute";
import AdminJobs from "./components/components_lite/AdminJobs";
import Companies from "./components/components_lite/Companies";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/jobs", element: <Jobs /> },
      { path: "/browse", element: <Browse /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoute allowedRole="student">
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "/description/:id", element: <Description /> },
      {
        path: "/admin/jobs",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <AdminJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <Companies />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
