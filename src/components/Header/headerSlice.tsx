import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface HeaderState {
  tagline: string;
  backdrop: string;
}

const initialState: HeaderState = {
  tagline: "What are we watching tonight?",
  backdrop: "",
};

export const HeaderSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setLine: (state, action) => {
      state.tagline = action.payload;
    },
    setBackDrop: (state, action) => {
      state.backdrop = action.payload;
    },
    resetHeader: () => initialState,
  },
  extraReducers: (builder) => {
    //
  },
});

//export actions
export const { setLine, setBackDrop, resetHeader } = HeaderSlice.actions;

//selector
export const selectHeader = (state: RootState) => state.header;

export default HeaderSlice.reducer;
