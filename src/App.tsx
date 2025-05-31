import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout";

// pages
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { ManagerCabinet } from "./pages/ManagerCabinet";

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/manager" element={<ManagerCabinet />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
