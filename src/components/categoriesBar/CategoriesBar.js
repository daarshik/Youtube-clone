import React, { useState } from "react";
import "./_categoriesBar.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularVideo,
  getVideoByCategory,
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
    // if (value == "All") dispatch(getPopularVideo());
    dispatch(getVideoByCategory(value));
  };

  return (
    <div className="categoriesBar">
      {keywords.map((item, i) => (
        <span
          key={i}
          onClick={() => handleClick(item)}
          className={activeElement == i ? "active" : ""}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
