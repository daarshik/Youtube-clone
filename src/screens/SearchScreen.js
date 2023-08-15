import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoBySearch } from "../redux/slices/searchslices";
import { Container } from "react-bootstrap";
import VideoHorizontal from "../components/videoHorizontal/VideoHorizontal";
import { useSelector } from "react-redux";

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  console.log(query);

  useEffect(() => {
    dispatch(getVideoBySearch(query));
  }, [query, dispatch]);

  const { items } = useSelector((state) => state.searchVideo);

  return (
    <Container>
      {items?.map((video) => (
        <VideoHorizontal video={video} key={video.id.videoId} searchScreen />
      ))}
    </Container>
  );
};

export default SearchScreen;
