import React from "react";
import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { fetchUsersAction } from "./store/reducers/Users/ActionCreators";
import { fetchSemesterAction } from "./store/reducers/Semester/ActionCreators";

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchSemesterAction());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
