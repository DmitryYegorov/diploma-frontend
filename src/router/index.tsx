import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useStyles } from "./styled";
import { Box, CircularProgress, Container } from "@mui/material";

import RequireAuth from "./RequireAuth";
import { useAppSelector } from "../hooks/redux";
import Header from "../components/Header";

const AuthPage = lazy(() => import("../pages/Auth"));
const RegisterPage = lazy(() => import("../pages/Register"));
const MainPage = lazy(() => import("../pages/Main"));
const LoadAccountingPage = lazy(() => import("../pages/LoadAccounting"));
const SubjectPage = lazy(() => import("../pages/Subject"));
const ScheduleDepartmentPage = lazy(
  () => import("../pages/ScheduleDepartment")
);

const StudentInfoPage = lazy(() => import("../pages/StudentInfo"));

const AppRouter = (): JSX.Element => {
  const classes = useStyles();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const access = localStorage.getItem("access");
  const userData = JSON.parse(localStorage.getItem("userData") || "null");

  return (
    <Suspense
      fallback={
        <Container
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <CircularProgress />
        </Container>
      }
    >
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
                  <Route
                    path={"schedule/:semesterId"}
                    element={<ScheduleDepartmentPage />}
                  />
                  <Route path={"subject"} element={<SubjectPage />} />
                  <Route path={"student-info"} element={<StudentInfoPage />} />
                </Routes>
              </RequireAuth>
            }
          />

          <Route path="*" element={<h1>404</h1>} />
        </Route>

        <Route path="auth/login" element={<AuthPage />} />
        <Route path="auth/register" element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
