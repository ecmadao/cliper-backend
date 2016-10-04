import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {
  handleCliperLoveStatusChange
} from '../../redux/actions';

class CliperOperation extends React.Component {
  render() {
    const {love, changeLoveStatus, id} = this.props;
    const starIconClass = classNames('fa cliper_operation cliper_love', {
      'fa-star-o': !love,
      'fa-star': love,
      'active': love
    });
    return (
      <div className="cliper_operations">
        <div className="cliper_operations_container">
          <i className={starIconClass} aria-hidden="true" onClick={() => {
            changeLoveStatus(id, !love)
            }}></i>
          <i className="fa fa-comment-o cliper_operation" aria-hidden="true"></i>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CliperOperation);
