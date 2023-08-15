import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getVideoBySearch = createAsyncThunk(
  "video/getVideoByCategory",
  async (keyword, { rejectWithValue, getState, dispatch }) => {
    // console.log("gbsbsr");

    try {
      const { data } = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/search",
        {
          params: {
            // key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
            key: "AIzaSyCpvR-jj2iUcVPBheWa0Ao4521AeaQc6hE",
            // key: "AIzaSyBE0lzlapm87jHUqPbHH5Vj2CxFRl55qwA",
            part: "snippet",
            maxResults: 20,
            //   pageToken: getState().video.popularVideo.nextPageToken,
            // q: getState().video.popularVideo.activeCategory,
            q: keyword,
            type: "video, channel",
          },
        }
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    items: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getVideoBySearch.fulfilled, (state, action) => {
      console.log(action.payload);
      state.items.push(...action.payload.items);
    });
  },
});

export default searchSlice.reducer;
