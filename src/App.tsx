import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/auth-context";
import { Layout } from "./components/Layout";
import { TanstackContext } from "./context/tanstack-context";
import { AnimatePresence } from "framer-motion";

// pages
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { ManagerCabinet } from "./pages/ManagerCabinet";
import { Orders } from "./pages/Orders";
import { CreateOrder } from "./pages/CreateOrder";
import NotFoundPage from "./pages/NotFound";
import PageWrapper from "./components/AnimationPageWrapper";
import ServerError from "./pages/ServerError";
import Loading from "./pages/Loading";
import GanttChart from "./pages/Diag";

function AppRoutes() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/gantt"
          element={
            <PageWrapper>
              <GanttChart />
            </PageWrapper>
          }
        />
        <Route
          path="*"
          element={
            <PageWrapper>
              <NotFoundPage />
            </PageWrapper>
          }
        />
        <Route
          path="/loading"
          element={
            <PageWrapper>
              <Loading />
            </PageWrapper>
          }
        />
        <Route
          path="/500"
          element={
            <PageWrapper>
              <ServerError />
            </PageWrapper>
          }
        />
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        {isAuthenticated ? (
          <>
            <Route
              path="/orders"
              element={
                <PageWrapper>
                  <Orders />
                </PageWrapper>
              }
            />
            <Route
              path="/create-order"
              element={
                <PageWrapper>
                  <CreateOrder />
                </PageWrapper>
              }
            />
            {user?.is_admin && (
              <Route
                path="/manager"
                element={
                  <PageWrapper>
                    <ManagerCabinet />
                  </PageWrapper>
                }
              />
            )}
          </>
        ) : (
          <>
            <Route
              path="/sign-in"
              element={
                <PageWrapper>
                  <SignIn />
                </PageWrapper>
              }
            />
            <Route
              path="/sign-up"
              element={
                <PageWrapper>
                  <SignUp />
                </PageWrapper>
              }
            />
          </>
        )}
      </Routes>
    </AnimatePresence>
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
