import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {
  changeCommentContent,
  changeCommentModalStatus
} from '../../redux/actions';
import Comment from './Comment';

class CliperComments extends React.Component {
  constructor(props) {
    super(props);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleCommentChange() {
    const content = this.commentContent.value;
    const {changeContent} = this.props;
    changeContent && changeContent(content);
  }

  renderComments() {
    const {comment} = this.props;
    const {comments} = comment;
    if (comments.length) {
      return comments.map((c, i) => {
        return (
          <Comment
            key={i}
            comment={c}
          />
        )
      });
    }
    return (
      <div>has no comments</div>
    )
  }

  render() {
    const {comment, closeModal} = this.props;
    const {commentModalActive, commentContent} = comment;
    const commentModalClass = classNames('cliper_comment_container', {
      'active': commentModalActive
    });
    return (
      <div className={commentModalClass}>
        <div
          className="cliper_comment_wrapper"
          onClick={() => closeModal()}></div>
        <div className="cliper_comment_modal">
          <div className="cliper_comments">
            {this.renderComments()}
          </div>
          <div className="cliper_comment_writer">
            <div className="comment_writer">
              <textarea
                value={commentContent}
                ref={ref => this.commentContent = ref}
                className="cliper_comment_content"
                onChange={this.handleCommentChange} />
            </div>
            <div className="button comment_submit">submit</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {comment} = state;
  return {comment}
}

function mapDispatchToProps(dispatch) {
  return {
    changeContent: (content) => {
      dispatch(changeCommentContent(content));
    },
    closeModal: () => {
      dispatch(changeCommentModalStatus(false));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CliperComments);
