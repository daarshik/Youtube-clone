import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getChannelDetails } from "../../redux/slices/channelslices";

const ChannelScreen = () => {
  const { channelId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  return <div>ChannelScreen</div>;
};

export default ChannelScreen;
