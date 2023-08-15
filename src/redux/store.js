import { configureStore } from "@reduxjs/toolkit";
import userslices from "./slices/userslices";
import videoslices from "./slices/videoslices";
import channelslices from "./slices/channelslices";
import commentslices from "./slices/commentslices";
import searchslices from "./slices/searchslices";

const store = configureStore({
  reducer: {
    userinfo: userslices,
    video: videoslices,
    channels: channelslices,
    commentList: commentslices,
    searchVideo: searchslices,
  },
});

export default store;
