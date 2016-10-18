import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Cliper from './Cliper/index';
import {
  TABS,
  formatClipers,
  filterClipersByTag
} from '../ConstValue';
import {
  handleTabChange,
  postNewTag,
  handleTagDelete
} from '../redux/actions';

class Clipers extends React.Component {
  constructor(props) {
    super(props);
  }

  renderClipers() {
    const {
      clipers,
      postNewTag,
      deleteTag,
      currentCliper,
      commentModalActive
    } = this.props;
    return clipers.map((cliper, index) => {
      return (
        <Cliper
          cliper={cliper}
          key={index}
          postNewTag={postNewTag}
          deleteTag={deleteTag}
          currentCliper={currentCliper}
          commentModalActive={commentModalActive}
        />
      )
    });
  }

  renderTabs() {
    const {handleTabChange, avtiveTab} = this.props;
    return Object.keys(TABS).map((tab, index) => {
      const tabClass = classNames('cliper_tab', {
        'active': avtiveTab === index
      });
      return (
        <div
          key={index}
          className={tabClass}
          onClick={() => {
            handleTabChange(index)
          }}>{TABS[tab]}</div>
      )
    });
  }

  render() {
    return (
      <div className="clipers_container">
        <div className="cliper_tabs">
          {this.renderTabs()}
        </div>
        <div className="clipers_wrapper">
          {this.renderClipers()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {clipers, avtiveTab, tags, comment, activeTags} = state;
  const {currentCliper, commentModalActive} = comment;
  const formatCliperObjs = formatClipers(clipers, tags);
  return {
    clipers: filterClipersByTag(formatCliperObjs, activeTags),
    avtiveTab,
    currentCliper,
    commentModalActive
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleTabChange: (index) => {
      dispatch(handleTabChange(index));
    },
    postNewTag: (content, pageUrl) => {
      dispatch(postNewTag(content, pageUrl));
    },
    deleteTag: (tagId, pageUrl) => {
      dispatch(handleTagDelete(tagId, pageUrl));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clipers)
