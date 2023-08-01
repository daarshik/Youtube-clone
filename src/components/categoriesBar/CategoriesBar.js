import React, { useState } from 'react';
import "./_categoriesBar.scss"
import { useDispatch, useSelector } from 'react-redux';
import { getVideoByCategory } from '../../redux/slices/videoslices';

const keywords = [
  'All',
  'React js',
  'Angular js',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  'Algorithm Art ',
  'Guitar',
  'Bengali Songs',
  'Coding',
  'Cricket',
  'Football',
  'Real Madrid',
  'Gatsby',
  'Poor Coder',
  'Shwetabh',
]

const CategoriesBar = () => {

  const [activeElement, setActiveElement] = useState();
  const dispatch = useDispatch();
  const handleClick = (value) => {
    console.log(value);
    setActiveElement(value);
    dispatch(getVideoByCategory(value));
  }

  const {items} = useSelector((state)=>(state.video.popularVideo))
  return (
    <div className='categoriesBar'>
      {keywords.map((item, i) => (
        <span key={i} 
        onClick = {() => handleClick(item)}
        className={activeElement == i? 'active' : ''}
        >{item}</span>
      ))}
    </div>
  )
}

export default CategoriesBar