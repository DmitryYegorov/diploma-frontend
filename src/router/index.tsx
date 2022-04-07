import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useStyles } from "./styled";
import { Box } from "@mui/material";

import RequireAuth from "./RequireAuth";
import { useAppSelector } from "../hooks/redux";
import Header from "../components/Header";

const AuthPage = lazy(() => import("../pages/Auth"));
const MainPage = lazy(() => import("../pages/Main"));
const LoadAccountingPage = lazy(() => import("../pages/LoadAccounting"));
const SubjectPage = lazy(() => import("../pages/Subject"));

const AppRouter = (): JSX.Element => {
  const classes = useStyles();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const access = localStorage.getItem("access");
  const userData = JSON.parse(localStorage.getItem("userData") || "null");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {!!userData && <Header />}
              <Box className={classes.main}>
                <Outlet />
              </Box>
            </>
          }
        >
          <Route
            path="/*"
            element={
              <RequireAuth isAuthenticated={!!userData}>
                <Routes>
                  <Route path={"main"} element={<MainPage />} />
                  <Route
                    path={"load-accounting/*"}
                    element={<LoadAccountingPage />}
                  />

                  <Route path={"subject"} element={<SubjectPage />} />
                </Routes>
              </RequireAuth>
            }
          />

          <Route path="*" element={<h1>404</h1>} />
        </Route>

        <Route path="auth/*" element={<AuthPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
