import React from "react";
import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { fetchUsersAction } from "./store/reducers/Users/ActionCreators";
import { fetchSemesterAction } from "./store/reducers/Semester/ActionCreators";
import moment from "moment";
import "moment/locale/ru";

function App() {
  const dispatch = useAppDispatch();

  const lang = localStorage.getItem("i18nextLng");
  moment.locale(lang);

  React.useEffect(() => {
    dispatch(fetchSemesterAction());
    dispatch(fetchUsersAction());
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
