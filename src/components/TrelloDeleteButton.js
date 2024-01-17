import React from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCard } from '../actions';

class TrelloDeleteButton extends React.Component {
  handleDeleteCard = () => {
    const { dispatch } = this.props;
    const { cardID} = this.props;
    const { listID} = this.props;


    dispatch(deleteCard(cardID, listID));
  };

  render() {
    return (
      <div onClick={this.handleDeleteCard}>
        <DeleteIcon fontSize="small" /> {" "}
      </div>
    );
  }
}

export default connect()(TrelloDeleteButton);
