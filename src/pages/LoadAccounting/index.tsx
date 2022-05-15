import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const SchedulePage = lazy(() => import("../LoadAccounting/Schedule"));
const CalendarPage = lazy(() => import("../LoadAccounting/Calendar"));
const OtherLoadPage = lazy(() => import("../LoadAccounting/OtherLoad"));
const UsersPage = lazy(() => import("../../pages/LoadAccounting/Users/List"));
const UserDashboard = lazy(
  () => import("../../pages/LoadAccounting/Users/Dashboard")
);
const ReportsPage = lazy(() => import("../ReportsList"));
const ReportDashboardPage = lazy(() => import("../ReportPage"));

const LoadAccountingPage = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={"calendar"} />} />
      <Route path={"calendar"} element={<CalendarPage />} />
      <Route
        path={"schedule/*"}
        element={
          <Routes>
            <Route index element={<SchedulePage />} />
          </Routes>
        }
      />
      <Route
        path={"users/*"}
        element={
          <Routes>
            <Route index element={<UsersPage />} />
            <Route path={":id"} element={<UserDashboard />} />
          </Routes>
        }
      />
      <Route
        path={"reports/*"}
        element={
          <Routes>
            <Route index element={<ReportsPage />} />
            <Route path={":id"} element={<ReportDashboardPage />} />
          </Routes>
        }
      />
      <Route
        path={"other-load/"}
        element={
          <Routes>
            <Route index element={<OtherLoadPage />} />
          </Routes>
        }
      />
    </Routes>
  );
};

export default LoadAccountingPage;
