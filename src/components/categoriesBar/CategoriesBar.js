import React, { useState } from "react";
import "./_categoriesBar.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularVideo,
  getVideoByCategory,
  setActiveCategory,
} from "../../redux/slices/videoslices";

const keywords = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Music",
  "Algorithm Art ",
  "Guitar",
  "Bengali Songs",
  "Coding",
  "Cricket",
  "Football",
  "Real Madrid",
  "Gatsby",
  "Poor Coder",
  "Shwetabh",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState();
  const dispatch = useDispatch();
  const handleClick = (value) => {
    setActiveElement(value);

    dispatch(setActiveCategory(value));
    if (value === "All") dispatch(getPopularVideo());
    else dispatch(getVideoByCategory(value));
  };

  return (
    <div className="categoriesBar">
      {keywords.map((item, index) => (
        <span
          key={index}
          onClick={() => handleClick(item)}
          className={activeElement == index ? "active" : ""}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
