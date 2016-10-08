import React from 'react';

class Comment extends React.Component {
  render() {
    const {comment, deleteComment} = this.props;
    const createdAt = comment.createdAt;
    const createDate = createdAt.split('T')[0];
    const createTime = createdAt.split('T')[1].split('.')[0];
    return (
      <div className="cliper_comment">
        <div className="comment_info">
          <span>{createDate} {createTime}</span>
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
