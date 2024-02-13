import React from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteList } from '../actions';

class TrelloDeleteListButton extends React.Component {
  handleDeleteList = () => {
    const { dispatch } = this.props;
    const { listID} = this.props;


    dispatch(deleteList(listID));
  };

  render() {
    return (
      <div onClick={this.handleDeleteList}>
        <DeleteIcon fontSize="small" /> {" "}
      </div>
    );
  }
}

export default connect()(TrelloDeleteListButton);
