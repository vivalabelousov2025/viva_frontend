import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/auth-context";
import { Layout } from "./components/Layout";
import { TanstackContext } from "./context/tanstack-context";

// pages
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { ManagerCabinet } from "./pages/ManagerCabinet";
import { Orders } from "./pages/Orders";
import { CreateOrder } from "./pages/CreateOrder";
import NotFoundPage from "./pages/NotFound";

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {isAuthenticated ? (
        <>
          <Route path="/orders" element={<Orders />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="*" element={<NotFoundPage />} />
          {user?.is_admin && (
            <Route path="/manager" element={<ManagerCabinet />} />
          )}
        </>
      ) : (
        <>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </>
      )}
    </Routes>
  );
}

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TanstackContext>
          <Layout>
            <AppRoutes />
          </Layout>
        </TanstackContext>
      </AuthProvider>
    </BrowserRouter>
  );
};
