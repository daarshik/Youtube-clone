import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularVideo,
  getVideoByCategory,
} from "../../redux/slices/videoslices";
import Loader from "../../components/loader/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { items, activeCategory, loading } = useSelector(
    (state) => state.video.popularVideo
  );

  useEffect(() => {
    dispatch(getPopularVideo());
  }, [dispatch]);

  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (activeCategory === "All") dispatch(getPopularVideo());
        else dispatch(getVideoByCategory(activeCategory));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <Container>
      <CategoriesBar />
      <Row>
        {loading &&
          items.map((item, index) => {
            if (index === 0) return null;
            return (
              <Col lg={3} md={4} key={index}>
                <Video item={item} />
              </Col>
            );
          })}
        : <Loader />
      </Row>
    </Container>
  );
};

export default HomeScreen;
