import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import Video from '../../components/video/Video';
import { useDispatch } from 'react-redux';
import { getPopularVideo } from '../../redux/slices/videoslices';

const HomeScreen = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPopularVideo())
  },[dispatch])

  return (
    <Container>
      
        <CategoriesBar />
        <Row>
        {[...new Array(20)].map((_, index) => (
            <Col lg={3} md={4} key={index}>
                <Video />
            </Col>
        ))}
        
        
        
        </Row>
    
    
    
    </Container>
  )
}

export default HomeScreen