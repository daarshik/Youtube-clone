import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCommentVideoById = createAsyncThunk(
  "comment/getCommentVideoById",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/commentThreads",
        {
          params: {
            // key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
            key: "AIzaSyCpvR-jj2iUcVPBheWa0Ao4521AeaQc6hE",
            // key: "AIzaSyBE0lzlapm87jHUqPbHH5Vj2CxFRl55qwA",
            part: "snippet",
            videoId: id,
          },
        }
      );
      //   console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ videoId, text }, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(videoId);
      const obj = {
        snippet: {
          videoId: videoId,
          topLevelComment: {
            snippet: {
              textOriginal: text,
            },
          },
        },
      };
      console.log(obj);
      console.log(getState().userinfo.accessToken);
      const { data } = await axios.post(
        "https://youtube.googleapis.com/youtube/v3/commentThreads",
        obj,
        {
          params: {
            part: "snippet",
          },
          headers: {
            Authorization: `Bearer ${getState().userinfo.accessToken}`,
          },
        }
      );
      // console.log(data);
      setTimeout(() => dispatch(getCommentVideoById(videoId)), 3000);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: {
      items: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentVideoById.fulfilled, (state, action) => {
      //   console.log(action.payload);
      state.comments.items = action.payload.items;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.comments.items.push(action.payload);
    });
  },
});

export default commentSlice.reducer;
