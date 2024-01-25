import React from "react";
import AddIcon from "@mui/icons-material/Add";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import { addList } from "../actions";
import CardCSS from "../styles/Card.module.css";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

class TrelloAddListButton extends React.Component {
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

  handleInputChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { title } = this.state;

    if (title) {
      this.setState({
        title: "",
      });
      dispatch(addList(title));
    }
    this.closeForm();
    return;
  };

  renderAddButton = () => {
    return (
      <div onClick={this.openForm} className={CardCSS.addListContainer} >
        <div className={CardCSS.addListContent}> 
          <div>
            <AddIcon></AddIcon>
          </div>
          <div>
            <p>Add another list</p>
          </div>
        </div>
      </div>
    );
  };

  renderForm = () => {
    //npm install react-textarea-autosize
    return (
      <div className={CardCSS.addListFormContainer}>
        <div className={CardCSS.card}>
          <div className={CardCSS.text}>
            <div>
              <div
                className={CardCSS.editTitle}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  backgroundColor: "#ccc",
                }}
              >
                <p className={CardCSS.labelEdit}>Title:</p>
                <div>
                  <TextareaAutosize
                    placeholder={"Enter a title for this list..."}
                    autoFocus
                    value={this.state.title}
                    onChange={this.handleInputChangeTitle}
                    className={CardCSS.inputDescription}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={CardCSS.icons}>
            <div className={CardCSS.icon} onClick={this.handleAddList}>
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



export default connect()(TrelloAddListButton);
