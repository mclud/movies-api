import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import apiReducer from "../features/API/apiSlice";
import headerReducer from "../components/Header/headerSlice";
import favsReducer from "../features/favs/favsSlice";
import navCfgReducer from "../features/navCfg/navCfgSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
    header: headerReducer,
    favs: favsReducer,
    navcfg: navCfgReducer,
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
