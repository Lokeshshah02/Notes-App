import React, { useState } from "react";
import "./model.scss";

const Model = ({ closeModal, createGroup}) => {

  const[noteName, setNoteName] = useState("")

  const [selectedColor, setSelectedColor] = useState('purple');


  const selectColors = (color) => {
    if (selectedColor === color) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  }
  

  const getBorderStyle = (color) => {
    return selectedColor === color ? { border: "1px solid black" } : {};
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (noteName && selectedColor) {
      createGroup(noteName, selectedColor);
  
      // Retrieve the existing data from local storage or initialize an empty array
      const existingNoteNames = JSON.parse(localStorage.getItem("storedNoteName")) || [];
      
  
      // Update the data by adding the new note name
      const updatedNoteNames = [...existingNoteNames, noteName];
      // console.log(updatedNoteNames)
      // Save the updated data back to local storage
      localStorage.setItem("storedNoteName", JSON.stringify(updatedNoteNames));
    }
    closeModal();
  };

   const handleChange = (e) => {
    setNoteName(e.target.value)
   }


  return (
    <>
      <div className="container"></div>
      <div className="model-container">
        <div className="paragraph">
          <h1>Create New Notes group</h1>
        </div>
        <div className="details-container">
          <div className="group-name-container">

            <form onSubmit={handleForm}>

            <label>Group Name</label>
            <input type="text" placeholder=" &nbsp;Enter your group name...." required
            onChange={handleChange} />
          
           <div className="color-container">
            <p>Choose colour</p>
            <div className="color">

            <span
                    id="purple"
                    onClick={() => selectColors("#b38bfa")}
                    style={getBorderStyle("#b38bfa")}
                    
                  ></span>
                  <span
                    id="pink"
                    onClick={() => selectColors("#ff79f2")}
                    style={getBorderStyle("#ff79f2")}
                  ></span>
                  <span
                    id="green"
                    onClick={() => selectColors("#43e6fc")}
                    style={getBorderStyle("#43e6fc")}
                  ></span>
                  <span
                    id="orange"
                    onClick={() => selectColors("#f19576")}
                    style={getBorderStyle("#f19576")}
                  ></span>
                  <span
                    id="blue"
                    onClick={() => selectColors("#0047ff")}
                    style={getBorderStyle("#0047ff")}
                  ></span>
                  <span
                    id="skyblue"
                    onClick={() => selectColors("#6691ff")}
                    style={getBorderStyle("#6691ff")}
                  ></span>

            </div>

          </div>
          <div className="btn">
          <button type="submit" id="btn">Create</button>
        </div>
        </form>
        </div>
        </div>
        </div>
        
      
    </>
  );
};

export default Model;
