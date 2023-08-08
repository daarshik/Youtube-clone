import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getChannelDetails = createAsyncThunk(
  "channel/getChannelDetails",
  async (id, { rejectWithValue, getState, dispatch }) => {
    console.log("sdasdbvasuibs");
    try {
      const { data } = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/channels",
        {
          params: {
            // key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
            // key: "AIzaSyCpvR-jj2iUcVPBheWa0Ao4521AeaQc6hE",
            key: "AIzaSyBE0lzlapm87jHUqPbHH5Vj2CxFRl55qwA",
            part: "snippet, statistics, contentDetails",
            id: id,
          },
        }
      );
      console.log(data);
      //   console.log("sdasdbvasuibs");
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channelInfo: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannelDetails.fulfilled, (state, action) => {
      console.log(action.payload.items);
      state.channelInfo = action.payload.items[0];
    });
  },
});

export default channelSlice.reducer;
