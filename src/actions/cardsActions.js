import { CONSTANTS } from "../actions";

export const addCard = (listID, text) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, listID },
  };
};

export const deleteCard = (cardID, listID) => {
  return { 
    type: CONSTANTS.DELETE_CARD, 
    payload: {cardID, listID} 
};};

export const editCard = (listID, cardID, newText) => {
  return {
    type: CONSTANTS.EDIT_CARD,
    payload: { cardID, listID, newText },
  };
};