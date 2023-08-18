import { configureStore } from "@reduxjs/toolkit";
import userslices from "./slices/userslices";
import videoslices from "./slices/videoslices";
import channelslices from "./slices/channelslices";
import commentslices from "./slices/commentslices";
import searchslices from "./slices/searchslices";
import subscriptionslices from "./slices/subscriptionslices";

const store = configureStore({
  reducer: {
    userinfo: userslices,
    video: videoslices,
    channels: channelslices,
    commentList: commentslices,
    searchVideo: searchslices,
    subscriptionVideo: subscriptionslices,
  },
});

export default store;
