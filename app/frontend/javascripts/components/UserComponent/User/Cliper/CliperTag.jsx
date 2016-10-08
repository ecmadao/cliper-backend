import React from 'react';

class CliperTag extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTag = this.deleteTag.bind(this);
  }

  deleteTag() {
    const {deleteTag, tag, url} = this.props;
    deleteTag && deleteTag(tag.objectId, url);
  }

  render() {
    const {tag} = this.props;
    return (
      <div className="cliper_tag">
        {tag.content}
        <i
          className="fa fa-times-circle-o tag_delete"
          onClick={this.deleteTag}></i>
      </div>
    )
  }
}

export default CliperTag;
