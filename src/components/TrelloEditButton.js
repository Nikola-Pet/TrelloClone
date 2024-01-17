import React from 'react';
import { connect } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';

class TrelloEditButton extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <EditIcon fontSize="small" />
      </div>
    );
  }
}

export default connect()(TrelloEditButton);
