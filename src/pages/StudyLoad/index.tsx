import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const ReportsListPage = lazy(() => import("./ReportsList"));
const ReportPage = lazy(() => import("./ReportPage"));

const StudyLoad = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<ReportsListPage />} />
      <Route path={":id"} element={<ReportPage />} />
    </Routes>
  );
};

export default StudyLoad;
