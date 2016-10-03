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
    default:
      return clipers;
  }
}

export function cliper(cliper = DEFAULT_STATE.cliper, action) {
  switch (action.type) {
    case ACTIONS.RESET_CLIPER:
      return setState({}, action.cliper);
    case ACTIONS.ADD_CLIPER_COMMENT:
      return setState(cliper, {
        comments: [...cliper.comments, action.comment]
      });
    case ACTIONS.DELETE_CLIPER_COMMENT:
      return setState(cliper, {
        comments: cliper.comments.filter((comment) => comment.id !== action.commentId)
      });
    case ACTIONS.CHANGE_LOVE_STATUS:
      return setState(cliper, {
        love: action.status
      });
    case ACTIONS.ADD_CLIPER_TAG:
      return setState(cliper, {
        tags: [...cliper.tags, action.tag]
      });
    case ACTIONS.DELETE_CLIPER_TAG:
      return setState(cliper, {
        tags: cliper.tags.filter((tag) => tag.id !== action.tagId)
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

function setState(state, newState) {
  return objectAssign({}, state, newState);
}
