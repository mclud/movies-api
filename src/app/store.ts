import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import apiReducer from "../features/API/apiSlice";
import headerReducer from "../components/Header/headerSlice";
import favsReducer from "../features/favs/favsSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
    header: headerReducer,
    favs: favsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
