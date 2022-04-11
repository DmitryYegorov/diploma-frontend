import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const SchedulePage = lazy(() => import("../LoadAccounting/Schedule"));
const ScheduleCreatePage = lazy(
  () => import("../LoadAccounting/Schedule/CreateSchedule")
);
const CalendarPage = lazy(() => import("../LoadAccounting/Calendar"));
const UsersPage = lazy(() => import("../../pages/LoadAccounting/Users/List"));
const UserDashboard = lazy(
  () => import("../../pages/LoadAccounting/Users/Dashboard")
);

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
            <Route path={"create"} element={<ScheduleCreatePage />} />
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
    </Routes>
  );
};

export default LoadAccountingPage;
