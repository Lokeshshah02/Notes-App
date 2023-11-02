import React, { useEffect, useState } from "react";
import Image from "../../assests/bg.png";
import lock from "../../assests/lock.png";
import "./pocketnotes.scss";
import Model from "../Model/Model";
import backArrow from "../../assests/backArrow.png";
import enter from "../../assests/enterIcon.png";

const PocketNotes = () => {
  const [selectedNoteName, setSelectedNoteName] = useState(null);
  const [isInNotesBox, setIsInNotesBox] = useState(false);
  const [modal, setModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [notesData, setNotesData] = useState([]);
  const [textareaValue, setTextareaValue] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const closeModal = () => setModal(false);

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      const text = event.target.value;
      const now = new Date();
      const hours = now.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      const time =
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
        " " +
        ampm;
      const date = now.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const newNote = {
        text,
        time,
        date,
        group: selectedNoteName,
      };

      const updatedNotesData = [...notesData, newNote];
      setNotesData(updatedNotesData);
      setTextareaValue("");

      localStorage.setItem(`notes-${selectedNoteName}`, JSON.stringify(updatedNotesData));
    }
  };

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups"));
    if (storedGroups) {
      setGroups(storedGroups);
    }

    if (selectedNoteName) {
      const storedNotes = JSON.parse(localStorage.getItem(`notes-${selectedNoteName}`));
      if (storedNotes) {
        setNotesData(storedNotes);
      }
    }
  }, [selectedNoteName]);

  const createGroup = (notesName, selectedColor) => {
    const notesIcon = notesName.substring(0, 2).toUpperCase();
    const newGroup = {
      name: notesName,
      icon: notesIcon,
      backgroundColor: selectedColor,
    };
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);

    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  const handleNoteName = (noteName) => {
    setSelectedNoteName(noteName);
    setIsInNotesBox(true);

    if (window.innerWidth < 768) {
      document
        .querySelector(".sub-container")
        .classList.add("sub-container-hidden-mobile");
      document
        .querySelector(".right-container")
        .classList.add("right-container-visible-mobile");
    } else {
      document
        .querySelector(".sub-container")
        .classList.remove("sub-container-hidden-mobile");
      document
        .querySelector(".right-container")
        .classList.remove("right-container-visible-mobile");
    }
  };

  const handleArrow = () => {
    setIsInNotesBox(false);
    if (window.innerWidth < 768) {
      document
        .querySelector(".sub-container")
        .classList.remove("sub-container-hidden-mobile");
    }
  };

  const handleEnterImageClick = () => {
    const enterKeyPressEvent = new KeyboardEvent("keydown", {
      key: "Enter",
    });

    const textareaElement = document.querySelector(".footer-container textarea");

    if (textareaElement) {
      textareaElement.dispatchEvent(enterKeyPressEvent);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="sub-containertt">
          <div className="left-container">
            <p>Pocket Notes</p>
            <div className="create-notes-container">
              <button onClick={() => setModal(true)}>
                + &nbsp; Create Notes Group
              </button>
              {modal && (
                <Model closeModal={closeModal} createGroup={createGroup} />
              )}
            </div>
            <div className="slide-group">
              {groups.map((note, index) => (
                <div key={index}>
                  <span
                    className="icon"
                    style={{ backgroundColor: note.backgroundColor }}
                  >
                    {note.icon}
                  </span>
                  <p onClick={() => handleNoteName(note.name)}>{note.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-container">
          {isInNotesBox ? (
            <div className="note-heading">
              {selectedNoteName &&
                groups.map((note, index) => {
                  if (note.name === selectedNoteName) {
                    const filteredNotes = notesData.filter(
                      (note) => note.group === selectedNoteName
                    );
                    return (
                      <>
                        <div key={index} className="note-header">
                          <p onClick={handleArrow}>
                            <img src={backArrow} alt="Back" />
                          </p>
                          <div
                            className="icon"
                            style={{ backgroundColor: note.backgroundColor }}
                          >
                            <p>{note.icon}</p>
                          </div>
                          <h1>{note.name}</h1>
                        </div>
                        <div className="notes-data">
                          {filteredNotes.map((note, index) => (
                            <div key={index} className="note-entry">
                              <div className="time-date">
                                <p>{note.time}</p>
                                <p>{note.date}</p>
                              </div>
                              <div className="notes-content">
                                <p>{note.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="footer-container">
                          <textarea
                            type="text"
                            placeholder="Enter your text here............"
                            onKeyPress={handleEnterPress}
                            value={textareaValue}
                            onChange={(e) => setTextareaValue(e.target.value)}
                          />
                          <button onClick={handleEnterImageClick}>
                            <img src={enter} alt="Insert" />
                          </button>
                        </div>
                      </>
                    );
                  }
                  return null;
                })}
            </div>
          ) : (
            <div className="right-container-static-page">
              <div className="image-container">
                <img src={Image} alt="Pocket Notes" />
              </div>
              <div className="pocket-notes-section">
                <p>Pocket Notes</p>
              </div>
              <div className="message-container">
                <p>
                  Send and receive messages without keeping your phone online.
                  <br />
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
              </div>
              <div className="end-to-end-encrypted-container">
                <img src={lock} alt="End-to-End Encryption" />
                <span> end-to-end encrypted</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PocketNotes;
