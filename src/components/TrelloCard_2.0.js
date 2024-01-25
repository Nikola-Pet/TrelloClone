import React, { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { editCard } from "../actions";
import CardCSS from "../styles/Card.module.css";
import TrelloDeleteButton from "./TrelloDeleteButton";
import TrelloEditButton from "./TrelloEditButton";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const TrelloCard = ({ text, id, index, listID, dispatch }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const textAreaRef = useRef(null);

  useEffect(() => {
    setNewText(text);
  }, [text]);

  useEffect(() => {
    if (editing) {
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(newText.length, newText.length);
    }
  }, [editing, newText]);
  
  const handleEdit = () => {
    dispatch(editCard(id, listID, newText));
    setEditing(false);
  };

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          className={CardCSS.cardContainer}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            {editing ? (
              <div className={CardCSS.card}>
                <div className={CardCSS.text}>
                  <TextareaAutosize
                    className={CardCSS.textInput}
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    ref={textAreaRef}
                  />
                </div>
                <div className={CardCSS.icons}>
                  <div className={CardCSS.icon} onClick={handleEdit}>
                    <DoneIcon fontSize="small"></DoneIcon>
                  </div>
                  <div
                    className={CardCSS.icon}
                    onClick={() => setEditing(false)}
                  >
                    <CloseIcon fontSize="small"></CloseIcon>
                  </div>
                </div>
              </div>
            ) : (
              <div className={CardCSS.card}>
                <div className={CardCSS.text}>
                  <p gutterBottom>{newText}</p>
                </div>
                <div className={CardCSS.icons}>
                  <div className={CardCSS.icon}>
                    <TrelloEditButton
                      onClick={() => setEditing(true)}
                      cardID={id}
                      listID={listID}
                    />
                  </div>
                  <div className={CardCSS.icon}>
                    <TrelloDeleteButton listID={listID} cardID={id} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default connect()(TrelloCard);
