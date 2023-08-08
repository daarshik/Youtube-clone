import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./watchScreen.scss";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Comments from "../../components/comments/Comments";
import MetaDataVideo from "../../components/metaDataVideo/MetaDataVideo";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideoById } from "../../redux/slices/videoslices";

const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoById(id));
  }, []);
  const { videoDetails } = useSelector((state) => state.video);
  return (
    <Row>
      <Col Lg={10}>
        <div className="watchScreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            allowFullScreen
            title={videoDetails?.snippet?.title}
            width="100%"
            height="100%"
          ></iframe>
        </div>
        <MetaDataVideo item={videoDetails} />
        <Comments channelId={videoDetails?.snippet?.channelId} videoId={id} />
      </Col>

      <Col Lg={2}>
        {[...Array(10)].map(() => (
          <VideoHorizontal />
        ))}
      </Col>
    </Row>
  );
};

export default WatchScreen;
