import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {
  deleteComment,
  postNewComment,
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
    const {comment, deleteComment} = this.props;
    const {comments} = comment;
    if (comments.length) {
      return comments.map((c, i) => {
        return (
          <Comment
            key={i}
            comment={c}
            deleteComment={deleteComment}
          />
        )
      });
    }
    // return (
    //   <div>has no comments</div>
    // )
  }

  render() {
    const {
      comment,
      closeModal,
      postNewComment
    } = this.props;
    const {
      commentModalActive,
      commentModalLoading,
      commentContent
    } = comment;
    const commentModalClass = classNames('cliper_comment_container', {
      'active': commentModalActive
    });
    const commentModalLoadingClass = classNames('comment_modal_loading', {
      'active': commentModalLoading
    })
    return (
      <div className={commentModalClass}>
        <div
          className="cliper_comment_wrapper"
          onClick={() => closeModal()}></div>
        <div className="cliper_comment_modal">
          <div className={commentModalLoadingClass}>
            <div className="comment_modal_center">
              <div className="loading_bounce"></div>
              <div className="loading_bounce"></div>
            </div>
          </div>
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
            <div
              className="button comment_submit"
              onClick={postNewComment}>新增记录</div>
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
    },
    postNewComment: () => {
      dispatch(postNewComment());
    },
    deleteComment: (id) => {
      dispatch(deleteComment(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CliperComments);
