import React from 'react';
import {connect} from 'react-redux';
import CliperContents from './CliperContents';
import CliperPage from './CliperPage';

class Cliper extends React.Component {

  renderCliper() {
    const {cliper} = this.props;
    const {contents} = cliper;
    const checkHasContent = contents.some((contentObj) => contentObj.content !== "");
    if (contents && contents.length && checkHasContent) {
      return this.renderCliperContent();
    }
    return (<CliperPage cliper={cliper}/>)
  }

  renderCliperContent() {
    const {cliper} = this.props;
    const {contents} = cliper;
    return (
      <div className="cliper_content_container">
        <div className="cliper_title">
          <a href={cliper.url} target="_blank" className="cliper_link">
            <i className="fa fa-link fa-2" aria-hidden="true"></i>&nbsp;{cliper.title}
          </a>
        </div>
        {this.renderCliperContents(contents)}
      </div>
    )
  }

  renderCliperContents(contents) {
    return contents.map((cliperObj, index) => {
      return (
        <CliperContents
          key={index}
          cliperContent={cliperObj}
        />
      )
    });
  }

  render() {
    return (
      <div className="cliper_container">
        {this.renderCliper()}
      </div>
    )
  }
}

export default Cliper;
