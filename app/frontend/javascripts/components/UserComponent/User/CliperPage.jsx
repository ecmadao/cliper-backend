import React from 'react';
import classNames from 'classnames';

class CliperPage extends React.Component {
  render() {
    const {cliper} = this.props;
    const {title, url, contents} = cliper;
    const content = contents.slice(-1)[0];
    const starIconClass = classNames('fa cliper_love', {
      'fa-star-o': !content.love,
      'active': content.love
    });
    return (
      <div className="cliper_page">
        <div className="cliper_page_title">
          <a className="cliper_page_container" href={url} target="_blank">
            <i className="fa fa-link fa-2" aria-hidden="true"></i>
            &nbsp;{cliper.title}
          </a>
        </div>
        <div className="cliper_page_info">
          <div className="cliper_time">
            <i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
            {content.createdAt.split('T')[0]}
          </div>
          <i className={starIconClass} aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

export default CliperPage;
