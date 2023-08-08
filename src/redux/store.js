import { configureStore } from "@reduxjs/toolkit";
import userslices from "./slices/userslices";
import videoslices from "./slices/videoslices";
import channelslices from "./slices/channelslices";
import commentslices from "./slices/commentslices";

const store = configureStore({
  reducer: {
    userinfo: userslices,
    video: videoslices,
    channels: channelslices,
    commentList: commentslices,
  },
});

export default store;
