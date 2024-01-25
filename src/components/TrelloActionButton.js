import React from "react";
import AddIcon from "@mui/icons-material/Add";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import CardCSS from "../styles/Card.module.css";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const currentDate = new Date().toISOString().split("T")[0];
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${day}.${month}.${year}`;
};

class TrelloActonButton extends React.Component {
  state = {
    formOpen: false,
  };

  openForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  closeForm = (e) => {
    this.setState({
      formOpen: false,
    });
  };

  handleInputChangeDescription = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleInputChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleInputChangePriority = (e) => {
    this.setState({
      priority: e.target.value,
    });
  };

  handleInputChangeStoryPoints = (e) => {
    this.setState({
      storyPoints: e.target.value,
    });
  };

  handleInputChangeDueDate = (e) => {
    this.setState({
      dueDate: e.target.value,
    });
  };

  currentDueDate = (e) => {
    this.setState({
      dueDate: formatDate(currentDate),
    });
  };

  handleInputChangeAssignee = (e) => {
    this.setState({
      assignee: e.target.value,
    });
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;
    const { title } = this.state;
    const { priority } = this.state;
    const { storyPoints } = this.state;
    const { dueDate } = this.state;
    const { assignee } = this.state;

    const currentDate = new Date().toISOString().split("T")[0];

    if (!dueDate) {
      dueDate = currentDate;
    }

    if (text && title) {
      this.setState({
        text: "",
        title: "",
        priority: "",
        storyPoints: "",
        dueDate: "",
        assignee: "",
      });
      dispatch(
        addCard(listID, text, title, priority, storyPoints, dueDate, assignee)
      );
    }
    this.closeForm();
    return;
  };

  renderAddButton = () => {
    const { list } = this.props;
    console.log(list);

    return (
      <div onClick={this.openForm} className={CardCSS.addCardButton}>
        <AddIcon></AddIcon>
        <p>Add card</p>
      </div>
    );
  };

  renderForm = () => {
    //npm install react-textarea-autosize
    return (
      <div>
        <div className={CardCSS.card}>
          <div className={CardCSS.text}>
            <div className={CardCSS.editTitle}>
              <p className={CardCSS.labelEdit}>Title:</p>
              <div>
                <TextareaAutosize
                  placeholder={"Enter a title for this card..."}
                  autoFocus
                  value={this.state.title}
                  onChange={this.handleInputChangeTitle}
                  onFocus={this.currentDueDate}
                  className={CardCSS.inputDescription}
                />
              </div>
            </div>
            <div className={CardCSS.editDescription}>
              <p className={CardCSS.labelEdit}>Description:</p>
              <div>
                <TextareaAutosize
                  placeholder={"Enter a description for this card..."}
                  value={this.state.text}
                  onChange={this.handleInputChangeDescription}
                  className={CardCSS.inputDescription}
                />
              </div>
            </div>
            <div className={CardCSS.flexRow}>
              <div>
                <p className={CardCSS.labelEdit}>Priority:</p>
              </div>
              <div>
                <select
                  onChange={this.handleInputChangePriority}
                  className={CardCSS.selectPriority}
                  defaultValue={"Low"}
                >
                  <option className={CardCSS.selectOption} value="Low">
                    Low
                  </option>
                  <option className={CardCSS.selectOption} value="Medium">
                    Medium
                  </option>
                  <option className={CardCSS.selectOption} value="High">
                    High
                  </option>
                  <option className={CardCSS.selectOption} value="Urgent">
                    URGENT
                  </option>
                </select>
              </div>
            </div>
            <div className={CardCSS.flexRow}>
              <div>
                <p className={CardCSS.labelEdit}>Story Points:</p>
              </div>
              <div>
                <input
                  currentDueDate
                  onChange={this.handleInputChangeStoryPoints}
                  className={CardCSS.inputStoryPoints}
                  type="number"
                  min="1"
                />
              </div>
            </div>
            <div className={CardCSS.flexRow}>
              <div>
                <p className={CardCSS.labelEdit}>Due Date:</p>
              </div>
              <div>
                <input
                  className={CardCSS.inputDate}
                  onChange={this.handleInputChangeDueDate}
                  type="date"
                  min={currentDate}
                />
              </div>
            </div>
            <div className={CardCSS.flexRow}>
              <div>
                <p className={CardCSS.labelEdit}>Assignee:</p>
              </div>
              <div>
                <select
                  onChange={this.handleInputChangeAssignee}
                  className={CardCSS.selectPriority}
                  defaultValue={"Low"}
                >
                  <option className={CardCSS.selectOption} value="No">
                    No assignee
                  </option>
                  <option className={CardCSS.selectOption} value="User 1">
                    User 1
                  </option>
                  <option className={CardCSS.selectOption} value="User 2">
                    User 2
                  </option>
                  <option className={CardCSS.selectOption} value="User 3">
                    User 3
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className={CardCSS.icons}>
            <div className={CardCSS.icon} onClick={this.handleAddCard}>
              <DoneIcon fontSize="small"></DoneIcon>
            </div>
            <div className={CardCSS.icon} onClick={this.closeForm}>
              <CloseIcon fontSize="small"></CloseIcon>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

export default connect()(TrelloActonButton);
