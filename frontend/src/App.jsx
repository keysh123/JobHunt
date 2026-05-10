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
import AddCompany from "./components/components_lite/AddCompany";
import EditCompany from "./components/components_lite/EditCompany";
import AddJob from "./components/components_lite/AddJob";
import EditJob from "./components/components_lite/EditJob";
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
      {
        path: "/admin/companies/create",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <AddCompany />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/create",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <AddJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies/edit/:id",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <EditCompany />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/edit/:id",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <EditJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <AdminJobs />
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
