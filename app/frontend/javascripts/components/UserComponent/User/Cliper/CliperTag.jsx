import React from 'react';

class CliperTag extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTag = this.deleteTag.bind(this);
  }

  deleteTag() {
    const {tag} = this.props;
    console.log(tag.objectId);
  }

  render() {
    const {tag} = this.props;
    return (
      <div
        onClick={this.deleteTag}
        className="cliper_tag">
        {tag.content}
      </div>
    )
  }
}

export default CliperTag;
