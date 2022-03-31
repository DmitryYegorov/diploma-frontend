import React from "react";
import Header from "../components/Header";
import MainPage from "../pages/Main";
import { useStyles } from "./styled";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

const AppRouter: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Box className={classes.main}>
        <BrowserRouter>
          <Routes>
            <Route path={"main"} element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
};

export default AppRouter;
