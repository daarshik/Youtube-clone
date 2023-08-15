import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./watchScreen.scss";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Comments from "../../components/comments/Comments";
import MetaDataVideo from "../../components/metaDataVideo/MetaDataVideo";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedVideos, getVideoById } from "../../redux/slices/videoslices";

const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { videoDetails } = useSelector((state) => state.video);
  const { items } = useSelector((state) => state.video.relatedVideos);
  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [id]);
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
        <Comments
          videoId={id}
          totalComments={videoDetails?.statistics?.commentCount}
        />
      </Col>

      <Col Lg={2}>
        {items
          ?.filter((video) => video.snippet)
          .map((video) => (
            <VideoHorizontal video={video} key={video.id.videoId} />
          ))}
      </Col>
    </Row>
  );
};

export default WatchScreen;
