import React from 'react';
import CliperContent from './CliperContent';

class CliperContents extends React.Component {
  renderClipers() {
    const {cliperContent, currentCliper, commentModalActive} = this.props;
    return cliperContent.clipers.map((cliper, index) => {
      if (cliper.content === "") {
        return;
      }
      return (
        <CliperContent
          key={index}
          cliper={cliper}
          active={currentCliper === cliper.id && commentModalActive}
        />);
    });
  }

  render() {
    const {cliperContent} = this.props;
    return (
      <div>
        <div className="cliper_time">
          <i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
          {cliperContent.createdAt}
        </div>
        <div className="clipers_content_container">
          {this.renderClipers()}
        </div>
      </div>
    )
  }
}

export default CliperContents;
