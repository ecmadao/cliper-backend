import React from 'react';
import CliperContent from './CliperContent';

class CliperContents extends React.Component {
  // renderCliperContents() {
  //   const {cliperContent} = this.props;
  //   return cliperContents.map((cliperContent, index) => {
  //     return (
  //       <div className="cliper_content_container">
  //         <div className="cliper_title">
  //           <a href={cliper.url} target="_blank" className="cliper_link">
  //             <i className="fa fa-link fa-2" aria-hidden="true"></i>&nbsp;{cliper.title}
  //           </a>
  //         </div>
  //         {this.renderContents(cliperContent)}
  //       </div>
  //     )
  //   });
  // }

  renderClipers() {
    const {cliperContent} = this.props;
    return cliperContent.clipers.map((cliper, index) => {
      if (cliper.content === "") {
        return;
      }
      return (<CliperContent key={index} cliper={cliper}/>);
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
