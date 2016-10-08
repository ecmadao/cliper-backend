import React from 'react';
import {connect} from 'react-redux';
import CliperContents from './CliperContents';
import CliperPage from './CliperPage';
import CliperTag from './CliperTag';

class Cliper extends React.Component {

  constructor(props) {
    super(props);
    this.postNewTag = this.postNewTag.bind(this);
  }

  postNewTag(e) {
    const {postNewTag, cliper} = this.props;
    if (e.which === 13) {
      const content = this.tag.value;
      postNewTag(content, cliper.url);
      this.tag.value = '';
    }
  }

  renderCliperTag() {
    return (
      <div className="cliper_tags_container">
        <i className="fa fa-tags" aria-hidden="true"></i>
        {this.renderTags()}
        <input
          className="input mini flat"
          type="text"
          placeholder="add tag"
          ref={ref => this.tag = ref}
          onKeyDown={this.postNewTag}
        />
      </div>
    )
  }

  renderTags() {
    const {cliper, deleteTag} = this.props;
    const {tags, url} = cliper;
    return tags.map((tagObj, index) => {
      return (
        <CliperTag
          url={url}
          tag={tagObj}
          key={index}
          deleteTag={deleteTag}
        />
      );
    });
  }

  renderCliper() {
    const {cliper} = this.props;
    const {contents} = cliper;
    const checkHasContent = contents.some((contentObj) => contentObj.hasContent);
    if (contents && contents.length && checkHasContent) {
      return this.renderCliperContent();
    }
    return (
      <CliperPage cliper={cliper}>
        {this.renderCliperTag()}
      </CliperPage>
    )
  }

  renderCliperContent() {
    const {cliper} = this.props;
    const {contents} = cliper;
    return (
      <div className="cliper_content_container">
        <div className="cliper_title">
          <a href={cliper.url} target="_blank" className="cliper_link">
            <i className="fa fa-link fa-2" aria-hidden="true"></i>&nbsp;{cliper.title}
          </a>
        </div>
        {this.renderCliperTag()}
        {this.renderCliperContents(contents)}
      </div>
    )
  }

  renderCliperContents(contents) {
    return contents.map((cliperObj, index) => {
      return (
        <CliperContents
          key={index}
          cliperContent={cliperObj}
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

export default Cliper;
