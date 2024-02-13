import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import { Droppable } from "react-beautiful-dnd";
import CardCSS from "../styles/Card.module.css";
import TrelloDeleteListButton from "./TrelloDeleteListButton";

const TrelloList = ({ title, cards, listID }) => {
  return (
    <Droppable droppableId={String(listID)}>
      {(provided) => (
        <div
          className={CardCSS.listContainer}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className={CardCSS.flexRow}>
            <div>
              <h4>{title}</h4>
            </div>
            <div className={CardCSS.icon}>
               <TrelloDeleteListButton listID={listID}/>
            </div>
          </div>

          {cards.map((card, index) => (
            <TrelloCard
              key={card.id}
              index={index}
              cardData={card}
              listID={listID}
            />
          ))}
          {provided.placeholder}
          <TrelloActionButton list listID={listID} />
        </div>
      )}
    </Droppable>
  );
};

export default TrelloList;
