import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/auth-context";
import { Layout } from "./components/Layout";
import { TanstackContext } from "./context/tanstack-context";
import { AnimatePresence } from "framer-motion";

// pages
import PageWrapper from "./components/AnimationPageWrapper";
import Loading from "./pages/Loading";

const Home = lazy(() => import("./pages/Home"));
const GanttChart = lazy(() => import("./pages/Diag"));
const Orders = lazy(() => import("./pages/Orders"));
const CreateOrder = lazy(() => import("./pages/CreateOrder"));
const ManagerCabinet = lazy(() => import("./pages/ManagerCabinet"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

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
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <PageWrapper>
                <Home />
              </PageWrapper>
            </Suspense>
          }
        />
        {isAuthenticated ? (
          <>
            <Route
              path="/orders"
              element={
                <Suspense fallback={<Loading />}>
                  <PageWrapper>
                    <Orders />
                  </PageWrapper>
                </Suspense>
              }
            />
            <Route
              path="/create-order"
              element={
                <Suspense fallback={<Loading />}>
                  <PageWrapper>
                    <CreateOrder />
                  </PageWrapper>
                </Suspense>
              }
            />
            {user?.is_admin && (
              <Route
                path="/manager"
                element={
                  <Suspense fallback={<Loading />}>
                    <PageWrapper>
                      <ManagerCabinet />
                    </PageWrapper>
                  </Suspense>
                }
              />
            )}
          </>
        ) : (
          <>
            <Route
              path="/sign-in"
              element={
                <Suspense fallback={<Loading />}>
                  <PageWrapper>
                    <SignIn />
                  </PageWrapper>
                </Suspense>
              }
            />
            <Route
              path="/sign-up"
              element={
                <Suspense fallback={<Loading />}>
                  <PageWrapper>
                    <SignUp />
                  </PageWrapper>
                </Suspense>
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
