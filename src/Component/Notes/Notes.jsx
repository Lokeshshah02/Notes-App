import React from "react";
import "./notes.scss";
import backArrow from "../../assests/backArrow.png";
import enter from "../../assests/enterIcon.png"

const Notes = () => {
  return (
    <>
      <div className="notes-container">
        <div className="header-container">
          <img src={backArrow} alt="" />
          <span className="icon">CV</span>

          <p>Cuvette</p>
        </div>
        
        <div className="notes-details">

          <div className="time-and-date">
          <time datetime="2023-10-31T15:30:00">October 31, 2023, 3:30 PM</time>
          </div>
          <div className="notes">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ut dignissimos saepe nesciunt doloribus, minus provident hic a quasi delectus?
          </div>
        </div>

        <div className="footer-container">
          <input type="text" placeholder="Enter your text here............" />
          {/* <img src={enter} alt="" /> */}
        </div>
      </div>
    </>
  );
};

export default Notes;
