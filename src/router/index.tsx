import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
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
const ActivateEmailPage = lazy(() => import("../pages/ActivateEmailPage"));
const DocumentsPage = lazy(() => import("../pages/Documents"));

const AppRouter = (): JSX.Element => {
  const classes = useStyles();
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
                  <Route
                    path={""}
                    element={<Navigate to={"load-accounting"} />}
                  />
                  <Route
                    path={"load-accounting/*"}
                    element={<LoadAccountingPage />}
                  />
                  <Route
                    path={"schedule/:semesterId"}
                    element={<ScheduleDepartmentPage />}
                  />
                  <Route
                    path={"document/*"}
                    element={
                      <Routes>
                        <Route index element={<DocumentsPage />} />
                      </Routes>
                    }
                  />
                  <Route path={"subject"} element={<SubjectPage />} />
                  <Route path={"student-info"} element={<StudentInfoPage />} />
                </Routes>
              </RequireAuth>
            }
          />

          <Route
            path={"activate-email/:activationCode"}
            element={<ActivateEmailPage />}
          />
          <Route path="/not-found" element={<h1>404</h1>} />
        </Route>

        <Route path="auth/login" element={<AuthPage />} />
        <Route path="auth/register" element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
