import objectAssign from 'object-assign';
import {
  DEFAULT_STATE
} from '../const_value';
import * as ACTIONS from '../actions';

export function avtiveTab(avtiveTab = DEFAULT_STATE.avtiveTab, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_ACTIVE_TAB:
      return action.tab
    default:
      return avtiveTab
  }
}

export function clipers(clipers = DEFAULT_STATE.clipers, action) {
  switch (action.type) {
    case ACTIONS.RESET_CLIPERS:
      return [...action.clipers];
    case ACTIONS.REMOVE_CLIPER:
      return clipers.filter((cliper) => cliper.objectId !== action.id);
    case ACTIONS.CHANGE_CLIPER_LOVE_STATUS:
      const cliper = clipers[action.index];
      return [...clipers.slice(0, action.index),
      objectAssign({}, cliper, {
        love: !cliper.love
      }), ...clipers.slice(action.index + 1)]
    default:
      return clipers;
  }
}

export function cliper(cliper = DEFAULT_STATE.cliper, action) {
  switch (action.type) {
    case ACTIONS.RESET_CLIPER:
      return setState({}, action.cliper);
    case ACTIONS.CHANGE_LOVE_STATUS:
      return setState(cliper, {
        love: action.status
      });
    case ACTIONS.ADD_CLIPER_TAG:
      return setState(cliper, {
        tags: [...cliper.tags, action.tag]
      });
    default:
      return cliper;
  }
}

export function csrf(csrf = DEFAULT_STATE.csrf, action) {
  switch (action.type) {
    default:
      return csrf;
  }
}

export function loading(loading = DEFAULT_STATE.loading, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_LOADING_STATUS:
      return action.status;
    default:
      return loading;
  }
}

export function search(search = DEFAULT_STATE.search, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_SEARCH_CONTENT:
      return action.content;
    default:
      return search;
  }
}

export function comment(comment = DEFAULT_STATE.comment, action) {
  switch (action.type) {
    case ACTIONS.RESET_CLIPER_COMMENTS:
      return setState(comment, {
        comments: [...action.comments]
      });
    case ACTIONS.ADD_CLIPER_COMMENT:
      return setState(comment, {
        comments: [action.comment, ...comment.comments]
      });
    case ACTIONS.CHANGE_COMMENT_MODAL_STATUS:
      return setState(comment, {
        commentModalActive: action.status
      });
    case ACTIONS.CHANGE_COMMENT_MODAL_LOADING_STATUS:
      return setState(comment, {
        commentModalLoading: action.status
      });
    case ACTIONS.CHANGE_CURRENT_CLIPER:
      return setState(comment, {
        currentCliper: action.id
      });
    case ACTIONS.CHANGE_COMMENT_CONTENT:
      return setState(comment, {
        commentContent: action.content
      });
    case ACTIONS.DELETE_CLIPER_COMMENT:
      return setState(comment, {
        comments: comment.comments.filter((c) => c.objectId !== action.commentId)
      });
    default:
      return comment
  }
}

export function tags(tags = DEFAULT_STATE.tags, action) {
  switch (action.type) {
    case ACTIONS.RESET_TAGS:
      return [...action.tags];
    case ACTIONS.ADD_TAG:
      let tag = tags[action.index];
      return [...tags.slice(0, action.index), {
        pageUrl: tag.pageUrl,
        tags: [...tag.tags, action.tag]
      }, ...tags.slice(action.index + 1)];
    case ACTIONS.DELETE_TAG:
      let targetTag = tags[action.index];
      return [...tags.slice(0, action.index), {
        pageUrl: targetTag.pageUrl,
        tags: targetTag.tags.filter((tag) => tag.objectId !== action.tagId)
      }, ...tags.slice(action.index + 1)];
    default:
      return tags;
  }
}

function setState(state, newState) {
  return objectAssign({}, state, newState);
}
