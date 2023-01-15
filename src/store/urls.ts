import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "url",
  initialState: [],
  reducers: {
    getUrls: (state, action) => {
      action.payload;
    },
  },
});

export const { getUrls } = slice.actions;
export default slice.reducer;
