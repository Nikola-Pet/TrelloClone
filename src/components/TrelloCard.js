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
import { TrelloShowCardModal } from "./TrelloShowCardModal";



const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${day}.${month}.${year}`;
};

const TrelloCard = ({ cardData, index, listID, dispatch }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(cardData.text);
  const [newTitle, setNewTitle] = useState(cardData.title);
  const [newDueDate, setNewDueDate] = useState(cardData.dueDate);
  const [newAssignee, setNewAssignee] = useState(cardData.assignee);
  const [newPriority, setNewPriority] = useState(cardData.priority);
  const [newStoryPoints, setNewStoryPoints] = useState(cardData.storyPoints);
  const [showModal, setShowModal] = useState(false);
  const textAreaRef = useRef(null);
  const textAreaRefTitle = useRef(null);

  useEffect(() => {
    setNewText(cardData.text);
  }, [cardData.text]);

  useEffect(() => {
    setNewTitle(cardData.title);
  }, [cardData.title]);

  useEffect(() => {
    setNewDueDate(cardData.dueDate);
  }, [cardData.dueDate]);

  useEffect(() => {
    setNewAssignee(cardData.assignee);
  }, [cardData.assignee]);

  useEffect(() => {
    setNewPriority(cardData.priority);
  }, [cardData.priority]);

  useEffect(() => {
    setNewStoryPoints(cardData.storyPoints);
  }, [cardData.storyPoints]);

  useEffect(() => {
    if (editing && newText) {
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(newText.length, newText.length);
    }
  }, [editing, newText]);

  useEffect(() => {
    if (editing && newTitle) {
      textAreaRefTitle.current.focus();
      textAreaRefTitle.current.setSelectionRange(
        newTitle.length,
        newTitle.length
      );
    }
  }, [editing, newTitle]);

  const handleEdit = () => {
    dispatch(
      editCard(listID, cardData.id, {
        newText: newText, 
        newTitle: newTitle,
        newDueDate: newDueDate,
        newAssignee: newAssignee,
        newPriority: newPriority,
        newStoryPoints: newStoryPoints,
      })
    );
    setEditing(false);
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Draggable draggableId={String(cardData.id)} index={index}>
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
                      style={{
                        overflow: "auto",
                      }}
                      className={CardCSS.textInput}
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      ref={textAreaRefTitle}
                    />
                    <TextareaAutosize
                      style={{
                        overflow: "auto",
                      }}
                      className={CardCSS.textInput}
                      type="text"
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      ref={textAreaRef}
                    />
                    <div>
                      <select
                        className={CardCSS.selectPriority}
                        defaultValue={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                      >
                        <option className={CardCSS.selectOption} value="Low">
                          Low
                        </option>
                        <option className={CardCSS.selectOption} value="Medium">
                          Medium
                        </option>
                        <option className={CardCSS.selectOption} value="High">
                          High
                        </option>
                        <option className={CardCSS.selectOption} value="Urgent">
                          URGENT
                        </option>
                      </select>
                    </div>
                    <div>
                      <input
                        currentDueDate
                        onChange={(e) => setNewStoryPoints(e.target.value)}
                        className={CardCSS.inputStoryPoints}
                        value={newStoryPoints}
                        type="number"
                        min="1"
                      />
                    </div>
                    <div>
                      <input
                        className={CardCSS.inputDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                        defaultValue={newDueDate}
                        type="date"
                      />
                    </div>
                    <div>
                      <select
                        onChange={(e) => setNewAssignee(e.target.value)}
                        className={CardCSS.selectPriority}
                        value={newAssignee}
                      >
                        <option className={CardCSS.selectOption} value="No assignee">
                          No assignee
                        </option>
                        <option className={CardCSS.selectOption} value="User 1">
                          User 1
                        </option>
                        <option className={CardCSS.selectOption} value="User 2">
                          User 2
                        </option>
                        <option className={CardCSS.selectOption} value="User 3">
                          User 3
                        </option>
                      </select>
                    </div>
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
                  <div onClick={handleCardClick}>
                    <div className={CardCSS.text}>
                      <p
                        className={CardCSS.cardLabelTitle}
                      >{`${cardData.title}`}</p>
                      <div className={CardCSS.cardLabelText}>
                        <p className={CardCSS.cardLabel} gutterBottom>
                          {newText}
                        </p>
                      </div>
                      <div className={CardCSS.cardLabelGroup}>
                        <div>
                          <p className={CardCSS.cardLabel}>
                            {`${cardData.priority}`}
                          </p>
                        </div>
                        <div>
                          <p className={CardCSS.cardLabel}>
                            {`${cardData.storyPoints}`}
                          </p>
                        </div>
                      </div>
                      <div className={CardCSS.cardLabelGroup}>
                        <div>
                          <p
                            className={CardCSS.cardLabel}
                          >{`${cardData.assignee}`}</p>
                        </div>
                        <div>
                          <p
                            className={CardCSS.cardLabel}
                          >{`${formatDate(cardData.dueDate)}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={CardCSS.icons}>
                    <div className={CardCSS.icon}>
                      <TrelloEditButton
                        onClick={() => setEditing(true)}
                        cardID={cardData.id}
                        listID={listID}
                      />
                    </div>
                    <div className={CardCSS.icon}>
                      <TrelloDeleteButton
                        listID={listID}
                        cardID={cardData.id}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>
      {showModal && (
        <TrelloShowCardModal
          handleCloseModal={handleCloseModal}
          title={cardData.title}
          description={cardData.text}
          dueDate={cardData.dueDate}
          assignee={cardData.assignee}
          priority={cardData.priority}
          storyPoints={cardData.storyPoints}
        />
      )}
    </>
  );
};

export default connect()(TrelloCard);
