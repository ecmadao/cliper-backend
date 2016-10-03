import objectAssign from 'object-assign';
import NProgress from 'nprogress';
require('nprogress/nprogress.css');
import {polyfill} from 'es6-promise';
polyfill();
import Message from '../../../common/message';
const message = new Message();

// clipers
export const fetchClipers = () => {
  return (dispatch, getState) => {
    dispatch(resetClipers([]));
  }
};

export const RESET_CLIPERS = 'RESET_CLIPERS';
export const resetClipers = (clipers) => {
  return {
    type: RESET_CLIPERS,
    clipers
  }
};

// loading
export const CHANGE_LOADING_STATUS = 'CHANGE_LOADING_STATUS';
export const changeLoadingStatus = (status) => {
  return {
    type: CHANGE_LOADING_STATUS,
    status
  }
};

// search
export const CHANGE_SEARCH_CONTENT = 'CHANGE_SEARCH_CONTENT';
export const changeSearchContent = (content) => {
  return {
    type: CHANGE_SEARCH_CONTENT,
    content
  }
};

// cliper
export const RESET_CLIPER = 'RESET_CLIPER';
export const resetCliper = (cliper) => {
  return {
    type: RESET_CLIPER,
    cliper
  }
};

export const ADD_CLIPER_COMMENT = 'ADD_CLIPER_COMMENT';
export const addCliperComment = (comment) => {
  return {
    type: ADD_CLIPER_COMMENT,
    comment
  }
};

export const DELETE_CLIPER_COMMENT = 'DELETE_CLIPER_COMMENT';
export const deleteCliperComment = (commentId) => {
  return {
    type: DELETE_CLIPER_COMMENT,
    commentId
  }
};

export const CHANGE_LOVE_STATUS = 'CHANGE_LOVE_STATUS';
export const changeLoveStatus = (status) => {
  return {
    type: CHANGE_LOVE_STATUS,
    status
  }
};

export const ADD_CLIPER_TAG = 'ADD_CLIPER_TAG';
export const addCliperTag = (tag) => {
  return {
    type: ADD_CLIPER_TAG,
    tag
  }
};

export const DELETE_CLIPER_TAG = 'DELETE_CLIPER_TAG';
export const deleteCliperTag = (tagId) => {
  return {
    type: DELETE_CLIPER_TAG,
    tagId
  }
};
