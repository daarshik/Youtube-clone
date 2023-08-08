import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  accessToken: "",
  isAuthenticated: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log(action.payload);
      state.displayName = action.payload.displayName;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
