import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <React.Fragment>
      <div className="position-relative " style={{ minHeight: "100vh" }}>
        <Header />
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
