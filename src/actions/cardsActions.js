import { CONSTANTS } from "../actions";

export const addCard = (listID, text, title, priority, storyPoints, dueDate, assignee) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, listID, title, priority, storyPoints, dueDate,assignee },
  };
};

export const deleteCard = (cardID, listID) => {
  return { 
    type: CONSTANTS.DELETE_CARD, 
    payload: {cardID, listID} 
};};

export const editCard = (listID, cardID, newText, newTitle) => {
  return {
    type: CONSTANTS.EDIT_CARD,
    payload: { cardID, listID, newText, newTitle },
  };
};