import React from 'react';
import classNames from 'classnames';
import CliperOperation from './CliperOperation';

class CliperPage extends React.Component {
  render() {
    const {cliper, children} = this.props;
    const {title, url, contents} = cliper;
    const content = contents.slice(-1)[0];
    const cliperObj = content.clipers[0];
    const cliperPageClass = classNames('cliper_page', {
      'loved': cliperObj.love
    });
    return (
      <div className={cliperPageClass}>
        <div className="cliper_page_title">
          <a className="cliper_page_container" href={url} target="_blank">
            <i className="fa fa-link fa-2" aria-hidden="true"></i>
            &nbsp;{cliper.title}
          </a>
        </div>
        {children}
        <div className="cliper_page_info">
          <div className="cliper_time">
            <i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
            {content.createdAt}
          </div>
        </div>
        <CliperOperation
          id={cliperObj.id}
          love={cliperObj.love}
        />
      </div>
    )
  }
}

export default CliperPage;
