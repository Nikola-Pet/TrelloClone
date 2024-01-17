import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import CardCSS from "../styles/Card.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TrelloDeleteButton from "./TrelloDeleteButton";
import TrelloEditButton from "./TrelloEditButton";

const CardContainer = styled.div`
  margin-bottom: 8px;
`;

const TrelloCard = ({ text, id, index, listID }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          className={CardCSS.cardContainer}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={CardCSS.card}>
            <div className={CardCSS.text}>
              <p gutterBottom>{text}</p>
            </div>
            <div className={CardCSS.icons}>
            <div className={CardCSS.icon}>
              <TrelloEditButton cardID={id} listID={listID}/></div>

              <div className={CardCSS.icon}>
                <TrelloDeleteButton listID={listID} cardID={id} />
                {provided.placeholder}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const styles = {
  carcContainer: {
    marginBottom: 8,
    boxShadow: "inset 0 0 10px 5px #808080",
  },
  cardText: {
    fontSize: 14,
  },
};
export default TrelloCard;
