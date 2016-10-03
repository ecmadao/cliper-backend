import React from 'react';
import classNames from 'classnames';

class CliperContent extends React.Component {
  render() {
    const {cliperObj} = this.props;
    const starIconClass = classNames('fa cliper_love', {
      'fa-star-o': !cliperObj.love,
      'active': cliperObj.love
    });
    return (
      <div className="cliper_content_container">
        <div className="cliper_content_wrapper">
          {cliperObj.content}
        </div>
        <div className="cliper_content_info">
          <div className="cliper_time">
            <i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
            {cliperObj.createdAt.split('T')[0]}
          </div>
          <i className={starIconClass} aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

export default CliperContent;
