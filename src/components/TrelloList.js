import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import CardCSS from "../styles/Card.module.css";



const TrelloList = ({ title, cards, listID }) => {
  console.log(cards);
  return (
    <Droppable droppableId={String(listID)}>
      {(provided) => (
        <div className={CardCSS.listContainer} {...provided.droppableProps} ref={provided.innerRef}>
          <h4>{title}</h4>
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
