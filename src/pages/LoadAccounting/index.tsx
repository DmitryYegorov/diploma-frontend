import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const SchedulePage = lazy(() => import("../LoadAccounting/Schedule"));
const ScheduleCreatePage = lazy(
  () => import("../LoadAccounting/Schedule/CreateSchedule")
);
const CalendarPage = lazy(() => import("../LoadAccounting/Calendar"));

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
    </Routes>
  );
};

export default LoadAccountingPage;
