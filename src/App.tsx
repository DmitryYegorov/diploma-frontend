import React from "react";
import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { useAppSelector } from "./hooks/redux";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        {isAuthenticated && <Header />}
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
