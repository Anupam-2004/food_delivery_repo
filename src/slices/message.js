// src/slices/message.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "", // stores messages like success or error
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload; // set a message
    },
    clearMessage: (state) => {
      state.message = ""; // clear the message
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
