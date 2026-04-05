import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
    <div className="sticky top-0  z-50 bg-white border-b">
      <Navbar/>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;