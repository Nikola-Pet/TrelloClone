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

const TrelloCard = ({ cardData, index, listID, dispatch }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(cardData.text);
  const [newTitle, setNewTitle] = useState(cardData.title);
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
    if (editing && newText) {  // Dodajte proveru da li je newText definisan
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(newText.length, newText.length);
    }
  }, [editing, newText]);
  
  useEffect(() => {
    if (editing && newTitle) {  // Dodajte proveru da li je newTitle definisan
      textAreaRefTitle.current.focus();
      textAreaRefTitle.current.setSelectionRange(
        newTitle.length,
        newTitle.length
      );
    }
  }, [editing, newTitle]);

  const handleEdit = () => {
    dispatch(editCard(listID, cardData.id, newText, newTitle));
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
                          >{`${cardData.dueDate}`}</p>
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
        /*  <div className={CardCSS.modalOverlay} onClick={handleCloseModal}>
          <div
            className={CardCSS.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={CardCSS.modalContainer}>
              <p
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                Title: {newTitle}
              </p>
              <p style={{ fontSize: "16px", marginBottom: "20px" }}>
                Text: {newText}
              </p>
              <button
                className={CardCSS.closeButton}
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div> */
      )}
    </>
  );
};

export default connect()(TrelloCard);
