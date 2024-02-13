import React from "react";
import CardCSS from "../styles/Card.module.css";

export const TrelloShowCardModal = ({
  handleCloseModal,
  title,
  description,
  storyPoints,
  priority,
  assignee,
  dueDate,
}) => {
  return (
    <div className={CardCSS.modalOverlay} onClick={handleCloseModal}>
      <div
        className={CardCSS.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={CardCSS.modalContainer}>
          <div className={CardCSS.modalTitleContainer}>
            <div>
              <p>{title}</p>
              <div>
                <p>
                  {description}
                </p>
              </div>
            </div>
            <div>
              <p>{assignee}</p>
              <p>{dueDate}</p>
              <p>{priority}</p>
              <p>{storyPoints}</p>
            </div>
          </div>

          
          <button className={CardCSS.closeButton} onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
