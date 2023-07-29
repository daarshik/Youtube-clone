import React, { useState } from 'react';
import "./_categoriesBar.scss"

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

  const handleClick = (i) => setActiveElement(i);


  return (
    <div className='categoriesBar'>
      {keywords.map((item, i) => (
        <span key={i} 
        onClick = {() => handleClick(i)}
        className={activeElement == i? 'active' : ''}
        >{item}</span>
      ))}
      
    </div>
  )
}

export default CategoriesBar