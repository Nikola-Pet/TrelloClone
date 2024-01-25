import { CONSTANTS } from "../actions";

let listID = 7;
let cardID = 13;

const initialState = [
  {
    title: "Not Prepared",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        title: "B2B",
        text: "Define project scope",
        storyPoints: 5,
        priority: "Low",
        assignee: "Nikola",
        dueDate: "01-02-2024"
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
     
/*       case CONSTANTS.EDIT_CARD1: {
        const newState = state.map((list) => {
          if (list.id === action.payload.listID) {
            return {
              ...list,
              cards: list.cards.map((card) => {
                if (card.id === action.payload.cardID) {
                  return {
                    ...card,
                    text: action.payload.newText,
                    title: action.payload.newTitle,
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
      } */
     
      case CONSTANTS.EDIT_CARD: {
        const { listID, cardID, newText, newTitle } = action.payload;
      
        return state.map((list) =>
          list.id === listID
            ? {
                ...list,
                cards: list.cards.map((card) =>
                  card.id === cardID
                    ? { ...card, text: newText, title: newTitle }
                    : card
                ),
              }
            : list
        );
      }

    case CONSTANTS.ADD_CARD: {

      if(!action.payload.priority){
        action.payload.priority = "Low"
      }

      if(!action.payload.assignee){
        action.payload.priority = "No"
      }


      const newCard = {
        text: action.payload.text,
        title: action.payload.title,
        priority: action.payload.priority,
        storyPoints: action.payload.storyPoints,
        dueDate: action.payload.dueDate,
        assignee : action.payload.assignee,
        id: `card-${cardID}`,
      };
      cardID += 1;
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
