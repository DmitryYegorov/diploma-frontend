import React from "react";
import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { fetchUsersAction } from "./store/reducers/Users/ActionCreators";

function App() {
  // const dispatch = useAppDispatch();
  //
  // React.useEffect(() => {
  //   dispatch(fetchUsersAction());
  // }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
