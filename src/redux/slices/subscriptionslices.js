import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubscribedChannel = createAsyncThunk(
  "subscribedChannel/getSubscribedChannel",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      //   console.log(getState().userinfo.accessToken);
      const { data } = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/subscriptions",
        {
          params: {
            part: "snippet, contentDetails",
            mine: true,
            key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
          },
          headers: {
            Authorization: `Bearer ${getState().userinfo.accessToken}`,
          },
        }
      );
      //   console.log("DFvz");
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const subscriptionSlices = createSlice({
  name: "subscribedChannel",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getSubscribedChannel.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.items.push(...action.payload.items);
      state.loading = true;
    });
  },
});

export default subscriptionSlices.reducer;
