import React from 'react';
import classNames from 'classnames';

class CliperContent extends React.Component {
  render() {
    const {cliper} = this.props;
    const starIconClass = classNames('fa cliper_love', {
      'fa-star-o': !cliper.love,
      'active': cliper.love
    });
    return (
      <div className="content_container">
        {cliper.content}
        {/* <div className="cliper_content_wrapper">
          {cliper.content}
        </div> */}
        {/* <div className="cliper_content_info">
          <i className={starIconClass} aria-hidden="true"></i>
        </div> */}
      </div>
    )
  }
}

export default CliperContent;
