import React from 'react';
import classNames from 'classnames';

class CliperOperation extends React.Component {
  render() {
    const {love} = this.props;
    const starIconClass = classNames('fa cliper_operation cliper_love', {
      'fa-star-o': !love,
      'active': love
    });
    return (
      <div className="cliper_operations">
        <div className="cliper_operations_container">
          <i className={starIconClass} aria-hidden="true"></i>
          <i className="fa fa-comment-o cliper_operation" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

export default CliperOperation;
