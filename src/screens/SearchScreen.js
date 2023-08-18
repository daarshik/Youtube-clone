import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoBySearch } from "../redux/slices/searchslices";
import { Container } from "react-bootstrap";
import VideoHorizontal from "../components/videoHorizontal/VideoHorizontal";
import { useSelector } from "react-redux";
import Loader from "../components/loader/Loader";

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  // console.log(query);

  useEffect(() => {
    dispatch(getVideoBySearch(query));
  }, [query, dispatch]);

  const { items, loading } = useSelector((state) => state.searchVideo);

  return (
    <Container>
      {loading ? (
        items?.map((video) => (
          <VideoHorizontal video={video} key={video.id.videoId} searchScreen />
        ))
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default SearchScreen;
