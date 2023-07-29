import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    displayName:'',
    isAuthenticated: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState ,
  reducers: {
    addUser: (state, action) => {
        state.displayName=action.payload;
        state.isAuthenticated=true;
    }
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;

