import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import Video from '../../components/video/Video';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularVideo } from '../../redux/slices/videoslices';

const HomeScreen = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPopularVideo())
  },[dispatch])

  const {items} = useSelector((state)=>(state.video.popularVideo))
  
  return (
    <Container>
      
        <CategoriesBar />
        <Row>
        {items.map((item) => {
          return (
            <Col lg={3} md={4} key={item.id}>
              <Video item={item} />
            </Col>
          );
        })}
        
        
        
        </Row>
    
    
    
    </Container>
  )
}

export default HomeScreen