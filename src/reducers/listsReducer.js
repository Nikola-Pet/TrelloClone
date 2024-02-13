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
        priority: "High",
        assignee: "User 3",
        dueDate: "2024-02-14",
      },
      {
        id: `card-${1}`,
        title: "Identify stakeholders",
        text: "Identify key stakeholders",
        storyPoints: 3,
        priority: "Medium",
        assignee: "User 1",
        dueDate: "2024-02-16",
      },
    ],
  },
  {
    title: "To Do",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        title: "Draft project proposal",
        text: "Draft project proposal",
        storyPoints: 2,
        priority: "Low",
        assignee: "User 2",
        dueDate: "2024-02-18",
      },
      {
        id: `card-${3}`,
        title: "Review literature",
        text: "Review related literature",
        storyPoints: 4,
        priority: "Medium",
        assignee: "User 1",
        dueDate: "2024-02-20",
      },
      {
        id: `card-${4}`,
        title: "Prepare project timeline",
        text: "Prepare project timeline",
        storyPoints: 3,
        priority: "High",
        assignee: "User 3",
        dueDate: "2024-02-22",
      },
    ],
  },
  {
    title: "In Progress",
    id: `list-${2}`,
    cards: [
      {
        id: `card-${5}`,
        title: "Conduct research",
        text: "Conduct initial research",
        storyPoints: 5,
        priority: "High",
        assignee: "User 3",
        dueDate: "2024-02-24",
      },
      {
        id: `card-${6}`,
        title: "Gather requirements",
        text: "Gather project requirements",
        storyPoints: 3,
        priority: "Medium",
        assignee: "User 2",
        dueDate: "2024-02-26",
      },
    ],
  },
  {
    title: "In Design",
    id: `list-${3}`,
    cards: [
      {
        id: `card-${7}`,
        title: "Create wireframe",
        text: "Create project wireframe",
        storyPoints: 4,
        priority: "Medium",
        assignee: "User 1",
        dueDate: "2024-02-28",
      },
      {
        id: `card-${8}`,
        title: "Design prototype",
        text: "Design project prototype",
        storyPoints: 4,
        priority: "Medium",
        assignee: "User 1",
        dueDate: "2024-03-02",
      },
    ],
  },
  {
    title: "Done",
    id: `list-${4}`,
    cards: [
      {
        id: `card-${9}`,
        title: "Complete documentation",
        text: "Complete project documentation",
        storyPoints: 3,
        priority: "Low",
        assignee: "User 2",
        dueDate: "2024-03-04",
      },
    ],
  },
  {
    title: "Review",
    id: `list-${5}`,
    cards: [
      {
        id: `card-${10}`,
        title: "Conduct review meeting",
        text: "Conduct project review meeting",
        storyPoints: 4,
        priority: "Medium",
        assignee: "User 1",
        dueDate: "2024-03-06",
      },
      {
        id: `card-${11}`,
        title: "Revise project",
        text: "Revise project based on feedback",
        storyPoints: 3,
        priority: "Low",
        assignee: "User 2",
        dueDate: "2024-03-08",
      },
    ],
  },
  {
    title: "Deployment",
    id: `list-${6}`,
    cards: [
      {
        id: `card-${12}`,
        title: "Deploy to production",
        text: "Deploy project to production",
        storyPoints: 5,
        priority: "High",
        assignee: "User 3",
        dueDate: "2024-03-10",
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
            cards: list.cards.filter(
              (card) => card.id !== action.payload.cardID
            ),
          };
        } else {
          return list;
        }
      });
      return newState;
    }

    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      const newState = state.filter((list) => list.id !== listID);
      return newState;
    }

    case CONSTANTS.EDIT_CARD: {
      const {
        listID,
        cardID,
        newText,
        newTitle,
        newDueDate,
        newAssignee,
        newPriority,
        newStoryPoints,
      } = action.payload;

      return state.map((list) =>
        list.id === listID
          ? {
              ...list,
              cards: list.cards.map((card) =>
                card.id === cardID
                  ? {
                      ...card,
                      text: newText,
                      title: newTitle,
                      dueDate: newDueDate,
                      assignee: newAssignee,
                      priority: newPriority,
                      storyPoints: newStoryPoints,
                    }
                  : card
              ),
            }
          : list
      );
    }

    case CONSTANTS.ADD_CARD: {
      if (!action.payload.priority) {
        action.payload.priority = "Low";
      }

      if (!action.payload.assignee) {
        action.payload.assignee = "No assignee";
      }

      if (!action.payload.storyPoints) {
        action.payload.storyPoints = "0";
      }

      const newCard = {
        text: action.payload.text,
        title: action.payload.title,
        priority: action.payload.priority,
        storyPoints: action.payload.storyPoints,
        dueDate: action.payload.dueDate,
        assignee: action.payload.assignee,
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
