import React from 'react';

class Comment extends React.Component {
  render() {
    const {comment, deleteComment} = this.props;
    return (
      <div className="cliper_comment">
        <div className="comment_info">
          <span>{comment.createdAt.split('T')[0]}</span>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => {
              deleteComment(comment.objectId);
            }}></i>
        </div>
        <div className="comment_content">
          {comment.content}
        </div>
      </div>
    )
  }
}

export default Comment;
