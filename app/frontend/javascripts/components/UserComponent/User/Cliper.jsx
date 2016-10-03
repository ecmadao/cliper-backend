import React from 'react';
import {connect} from 'react-redux';
import CliperContent from './CliperContent';
import CliperPage from './CliperPage';

class Cliper extends React.Component {

  renderCliper() {
    const {cliper} = this.props;
    const {contents} = cliper;
    const checkHasContent = contents.some((contentObj) => contentObj.content !== "");
    if (contents && contents.length && checkHasContent) {
      return (
        <div>
          <div className="cliper_title">
            <a href={cliper.url} target="_blank" className="cliper_link">
              <i className="fa fa-link fa-2" aria-hidden="true"></i>&nbsp;{cliper.title}
            </a>
          </div>
          <div className="cliper_content">
            {this.renderCliperContent(contents)}
          </div>
        </div>
      )
    }
    return (<CliperPage cliper={cliper}/>)
  }

  renderCliperContent(contents) {
    return contents.map((cliperObj, index) => {
      if (cliperObj.content === "") {
        return
      }
      return (
        <CliperContent
          key={index}
          cliperObj={cliperObj}
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

// function mapStateToProps(state) {
//   const {clipers} = state;
//   return {
//     clipers
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//
// }

export default Cliper;
// export default connect(mapStateToProps, mapDispatchToProps)(Cliper)
