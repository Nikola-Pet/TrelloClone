import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import CardCSS from "../styles/Card.module.css";

const TrelloModal = ({ newTitle, newText, handleCloseModal, handleEdit }) => {
  return (
    <div className={CardCSS.modalContainer}>
      <p style={{ fontSize: '20px', marginBottom: '10px', fontWeight: 'bold' }}>Title: {newTitle}</p>
      <p style={{ fontSize: '16px', marginBottom: '20px' }}>Text: {newText}</p>
      {/* ... (other details) */}
      <div className={CardCSS.icons}>
        <div className={CardCSS.icon} onClick={handleEdit}>
          <DoneIcon fontSize="small"></DoneIcon>
        </div>
        <div className={CardCSS.icon} onClick={handleCloseModal}>
          <CloseIcon fontSize="small"></CloseIcon>
        </div>
      </div>
    </div>
  );
};

export default TrelloModal;
