import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 5;

const initialState = [
  {
    title: "Not Prepared",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: "Define project scope",
      },
      {
        id: `card-${1}`,
        text: "Identify key stakeholders",
      },
    ],
  },
  {
    title: "To Do",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        text: "Draft project proposal",
      },
      {
        id: `card-${3}`,
        text: "Review related literature",
      },
      {
        id: `card-${4}`,
        text: "Prepare project timeline",
      },
    ],
  },
  {
    title: "In Progress",
    id: `list-${2}`,
    cards: [
      {
        id: `card-${5}`,
        text: "Conduct initial research",
      },
      {
        id: `card-${6}`,
        text: "Gather project requirements",
      },
    ],
  },
  {
    title: "In Design",
    id: `list-${3}`,
    cards: [
      {
        id: `card-${7}`,
        text: "Create project wireframe",
      },
      {
        id: `card-${8}`,
        text: "Design project prototype",
      },
    ],
  },
  {
    title: "Done",
    id: `list-${4}`,
    cards: [
      {
        id: `card-${9}`,
        text: "Complete project documentation",
      },
    ],
  },
  {
    title: "Review",
    id: `list-${5}`,
    cards: [
      {
        id: `card-${10}`,
        text: "Conduct project review meeting",
      },
      {
        id: `card-${11}`,
        text: "Revise project based on feedback",
      },
    ],
  },
  {
    title: "Deployment",
    id: `list-${6}`,
    cards: [
      {
        id: `card-${12}`,
        text: "Deploy project to production",
      },
    ],
  },
];


const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`,
      };
      listID += 1;
      return [...state, newList];

      case CONSTANTS.DELETE_CARD: {
        const newState = state.map((list) => {
          if (list.id === action.payload.listID) {
            
            return {
              ...list,
              cards: list.cards.filter((card) => card.id !== action.payload.cardID),
              
            };
          } else {
            return list;
          }
        });
        return newState;
      }
       
      case CONSTANTS.EDIT_CARD: {
        const newState = state.map((list) => {
          if (list.id === action.payload.listID) {
            return {
              ...list,
              cards: list.cards.map((card) => {
                if (card.id === action.payload.cardID) {
                  return {
                    ...card,
                    text: action.payload.newText,
                  };
                } else {
                  return card;
                }
              }),
            };
          } else {
            return list;
          }
        });
        return newState;
      }
      

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`,
      };
      cardID += 1;

      console.log("action received", action);

      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });

      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
      } = action.payload;
      const newState = [...state];

      //same column
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      //different columns
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find((list) => droppableIdStart === list.id);
        const listEnd = state.find((list) => droppableIdEnd === list.id);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;

    default:
      return state;
  }
};

export default listReducer;
