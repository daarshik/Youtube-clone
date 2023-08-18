import React, { useEffect } from "react";
import "./subscriptions.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannel } from "../../redux/slices/subscriptionslices";
import { Container } from "react-bootstrap";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Loader from "../../components/loader/Loader";

const SubscriptionsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscribedChannel());
  }, [dispatch]);

  const { loading, items } = useSelector((state) => state.subscriptionVideo);

  return (
    <Container>
      {loading ? (
        items.map((video) => {
          return <VideoHorizontal video={video} key={video.id} subScreen />;
        })
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default SubscriptionsScreen;
