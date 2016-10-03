import React from 'react';
import {connect} from 'react-redux';
import CliperContent from './CliperContent';

class Cliper extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCliperContent() {
    const {cliper} = this.props;
    const {contents} = cliper;
    return contents.map((cliperObj, index) => {
      return (
        <CliperContent
          key={index}
          cliperObj={cliperObj}
        />
      )
    });
  }

  render() {
    const {cliper} = this.props;
    return (
      <div className="cliper_container">
        <div className="cliper_title">
          <a href={cliper.url} target="_blank" className="cliper_link">
            <i className="fa fa-link fa-2" aria-hidden="true"></i>&nbsp;{cliper.title}
          </a>
        </div>
        <div className="cliper_content">
          {this.renderCliperContent()}
        </div>
        {/* <div className="cliper_content">
          {cliper.content ? <div className="cliper_content_wrapper">{cliper.content}</div> : ''}
          </div>
          <div className="cliper_info">
          <div className="cliper_time">
          <i className="fa fa-calendar" aria-hidden="true"></i>
          {cliper.createdAt.split('T')[0]}
          </div>
          <div className="cliper_comment">
          <i className="fa fa-comment-o" aria-hidden="true"></i>
          </div>
        </div> */}
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
