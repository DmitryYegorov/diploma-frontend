import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CalendarPage from "../../pages/LoadAccounting/Calendar";

const LoadAccountingRoute = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={"calendar"} />} />
      <Route path={"calendar"} element={<CalendarPage />} />
      <Route path={"subject"} element={<h1>SubjectPage</h1>} />
    </Routes>
  );
};

export default LoadAccountingRoute;
