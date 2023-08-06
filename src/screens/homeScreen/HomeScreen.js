import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import { useDispatch, useSelector } from "react-redux";
import { getPopularVideo } from "../../redux/slices/videoslices";

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPopularVideo());
  }, [dispatch]);

  const { items } = useSelector((state) => state.video.popularVideo);

  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        await dispatch(getPopularVideo());
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
        {items.map((item, index) => {
          return (
            <Col lg={3} md={4} key={index}>
              <Video item={item} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default HomeScreen;
