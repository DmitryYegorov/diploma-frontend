import React from "react";
import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { fetchUsersAction } from "./store/reducers/Users/ActionCreators";
import {
  fetchSemesterAction,
  fetchSemestersAction,
} from "./store/reducers/Semester/ActionCreators";
import moment from "moment";
import "moment/locale/ru";
import { fetchSubjectsAction } from "./store/reducers/Subject/ActionCreators";
import { fetchRoomsAction } from "./store/reducers/Room/ActionCreators";
import { fetchGroupsWithFacultiesAction } from "./store/reducers/Group/ActionCreators";
import { Toaster } from "react-hot-toast";
import { Typography } from "@mui/material";

function App() {
  const dispatch = useAppDispatch();

  const lang = localStorage.getItem("i18nextLng");
  moment.locale(lang);

  React.useEffect(() => {
    dispatch(fetchSemesterAction());
    dispatch(fetchSemestersAction());
    dispatch(fetchUsersAction());
    dispatch(fetchSubjectsAction());
    dispatch(fetchRoomsAction());
    dispatch(fetchGroupsWithFacultiesAction());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <Typography>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{ duration: 5000 }}
        />
      </Typography>
    </>
  );
}

export default App;
