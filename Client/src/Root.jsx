import React from "react";
import { Navbar,Footer } from "./index";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
