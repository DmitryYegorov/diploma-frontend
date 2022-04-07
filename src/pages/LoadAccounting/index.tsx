import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const SchedulePage = lazy(() => import("../LoadAccounting/Schedule"));
const CalendarPage = lazy(() => import("../LoadAccounting/Calendar"));

const LoadAccountingPage = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={"calendar"} />} />
      <Route path={"calendar"} element={<CalendarPage />} />
      <Route path={"schedule"} element={<SchedulePage />} />
    </Routes>
  );
};

export default LoadAccountingPage;
