import React, {Component} from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import {DragDropContext} from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";
import TrelloAddListButton from "./TrelloAddListButton";


const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`

class App extends Component{
  state = {
    placeholderData: null,
  };

  onDragStart = (start) => {
    const {source} = start;
    this.setState({
      placeholderData: this.props.lists[source.droppableId].cards[source.index],
    });
  };

  onDragEnd = (result) => {
    //TODO: reordering logic
    const {destination, source, draggableId} = result;
    if (!destination){
      return;
    }

    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    ));
    this.setState({placeholderData:null});
  };

  render() {

    const {lists} = this.props;
    return (
      <DragDropContext onDragEnd={ this.onDragEnd}>
      <div className="App">
        <h2>Hello</h2>
        <ListContainer>
        {lists.map(list => (
          <TrelloList listID = {list.id} key={list.id} title={list.title} cards={list.cards} placeholderData={this.state.placeholderData}/>
        ))}
       <TrelloAddListButton style={styles.actionBtn}/>
        </ListContainer>
      </div>
      </DragDropContext>
    );
  }
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row",
    width: 310
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect (mapStateToProps) (App);
