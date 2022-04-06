import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/Auth/slice";
import subjectReducer from "./reducers/Subject/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  subject: subjectReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
