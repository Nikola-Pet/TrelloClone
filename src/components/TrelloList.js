import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloActonButton from "./TrelloActionButton";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => (props.isDraggingOver ? 'lightblue' : '#ccc')};  border-radius: 3px;
  width: 300px;
  padding: 8px;
  margin-right: 8px;
  height: 100%;
`;

const TrelloList = ({ title, cards, listID }) => {
  console.log(cards);
  return (
    <Droppable droppableId={String(listID)}>
      {(provided) => (
        <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
          <h4>{title}</h4>
          {cards.map((card, index) => (
            <TrelloCard
              key={card.id}
              index={index}
              text={card.text}
              id={card.id}
              listID={listID}
            />
          ))}
          {provided.placeholder}
          <TrelloActonButton list listID={listID} />
          
        </ListContainer>
      )}
    </Droppable>
  );
};

export default TrelloList;
