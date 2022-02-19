import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface NavCfg {
  page_type: string;
  lang: string;
}

const initialState: NavCfg = {
  page_type: "home",
  lang: "en",
};

export const navCfgSlice = createSlice({
  name: "navcfg",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setPageType: (state, action) => {
      state.page_type = action.payload;
    },
  },
});

//create slice

//export actions
export const { setLang, setPageType } = navCfgSlice.actions;

//selector
export const selectNavCfg = (state: RootState) => state.navcfg;

export default navCfgSlice.reducer;
