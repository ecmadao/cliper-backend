import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';

class Cliper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {cliper} = this.props;
    const starIconClass = classNames('fa cliper_love', {
      'fa-star-o': !cliper.love,
      'active': cliper.love
    });
    return (
      <div className="cliper_container">
        <div className="cliper_title">
          <a href={cliper.url} target="_blank" className="cliper_link">
            {cliper.title}
          </a>
          <i className={starIconClass} aria-hidden="true"></i>
        </div>
        <div className="cliper_content">
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
        </div>
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
