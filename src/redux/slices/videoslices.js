import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import video from "../../components/video/Video";

export const getPopularVideo = createAsyncThunk(
  "video/getPopularVideo",
  async (video, { rejectWithValue, getState, dispatch }) => {
    // console.log("gbsbsr")

    try {
      const { data } = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/videos",
        {
          params: {
            // key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
            key: "AIzaSyCpvR-jj2iUcVPBheWa0Ao4521AeaQc6hE",
            // key: "AIzaSyBE0lzlapm87jHUqPbHH5Vj2CxFRl55qwA",
            part: "snippet, contentDetails,statistics",
            chart: "mostPopular",
            regionCode: "IN",
            maxResults: 20,
            pageToken: getState().video.popularVideo.nextPageToken,
          },
        }
      );
      //   console.log(getState().video.popularVideo.nextPageToken);
      //   console.log(data);
      //    console.log("gbsbsr")
      return data;
    } catch (error) {
      // console.log("Hiiiiiiiiiiiiii!!")
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getVideoByCategory = createAsyncThunk(
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
            pageToken: getState().video.popularVideo.nextPageToken,
            // q: getState().video.popularVideo.activeCategory,
            q: keyword,
            type: "video",
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

export const getVideoById = createAsyncThunk(
  "video/getVideoById",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/videos",
        {
          params: {
            // key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
            key: "AIzaSyCpvR-jj2iUcVPBheWa0Ao4521AeaQc6hE",
            // key: "AIzaSyBE0lzlapm87jHUqPbHH5Vj2CxFRl55qwA",
            part: "snippet, statistics",
            id: id,
          },
        }
      );
      // console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRelatedVideos = createAsyncThunk(
  "video/getRelatedVideos",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/search",
        {
          params: {
            // key: "AIzaSyBE0lzlapm87jHUqPbHH5Vj2CxFRl55qwA",
            key: "AIzaSyCpvR-jj2iUcVPBheWa0Ao4521AeaQc6hE",
            part: "snippet",
            // relatedToVideoId: id,
            maxResults: 15,
            type: "video",
          },
        }
      );
      // console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState: {
    popularVideo: {
      items: [
        {
          id: "",
          snippet: {
            channelId: "",
            channelTitle: "",
            title: "",
            publishedAt: "",
            thumbnails: {
              medium: "",
            },
          },
        },
      ],
      nextPageToken: null,
      activeCategory: "All",
    },
    videoDetails: {},
    relatedVideos: {
      items: [],
    },
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.popularVideo.activeCategory = action.payload;
      // console.log(state.popularVideo.activeCategory);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPopularVideo.fulfilled, (state, action) => {
      if (state.popularVideo.items && state.popularVideo.items.length > 1)
        state.popularVideo.items.push(...action.payload.items);
      else state.popularVideo.items = action.payload.items;
      // state.popularVideo.items = [
      //   ...state.popularVideo.items,
      //   ...action.payload.items,
      // ];
      state.popularVideo.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getVideoByCategory.fulfilled, (state, action) => {
      // console.log(action.payload);

      // state.popularVideo.items = [
      //   ...state.popularVideo.items,
      //   ...action.payload.items,
      // ];
      state.popularVideo.items = action.payload.items;
      state.popularVideo.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getVideoById.fulfilled, (state, action) => {
      // console.log(state.popularVideo.videoDetails);
      state.videoDetails = action.payload.items[0];
    });
    builder.addCase(getRelatedVideos.fulfilled, (state, action) => {
      console.log(action.payload);
      state.relatedVideos.items.push(...action.payload.items);
    });
  },
});

export const { setActiveCategory } = videoSlice.actions;
export default videoSlice.reducer;
