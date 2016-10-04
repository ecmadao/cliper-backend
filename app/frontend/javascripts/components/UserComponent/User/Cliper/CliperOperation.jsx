import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {
  handleCommentModalOpen,
  handleCliperLoveStatusChange
} from '../../redux/actions';

class CliperOperation extends React.Component {
  render() {
    const {
      id,
      love,
      changeLoveStatus,
      handleCommentModalOpen
    } = this.props;
    const starIconClass = classNames('fa cliper_operation cliper_love', {
      'fa-star-o': !love,
      'fa-star': love,
      'active': love
    });
    return (
      <div className="cliper_operations">
        <div className="cliper_operations_container">
          <i
            className={starIconClass}
            aria-hidden="true"
            onClick={() => {
              changeLoveStatus(id, !love);
            }}></i>
          <i
            className="fa fa-comment-o cliper_operation"
            aria-hidden="true"
            onClick={() => {
              handleCommentModalOpen(id);
            }}></i>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    changeLoveStatus: (id, status) => {
      dispatch(handleCliperLoveStatusChange(id, status));
    },
    handleCommentModalOpen: (id) => {
      dispatch(handleCommentModalOpen(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CliperOperation);
