import objectAssign from 'object-assign';
import NProgress from 'nprogress';
require('nprogress/nprogress.css');
import {polyfill} from 'es6-promise';
polyfill();
import Message from '../../../common/message';
const message = new Message();

// tab
export const CHANGE_ACTIVE_TAB = 'CHANGE_ACTIVE_TAB';
export const changeActiveTab = (tab) => {
  return {
    type: CHANGE_ACTIVE_TAB,
    tab
  }
};

// clipers
export const fetchClipers = () => {
  return (dispatch, getState) => {
    $.ajax({
      url: '/cliper/all',
      method: 'get',
      success: (data) => {
        if (data.success) {
          dispatch(formatClipers(data.data));
        } else {
          message.error('Ops..some error happened');
        }
        dispatch(changeLoadingStatus(false));
      },
      error: (err) => {
        message.error('Ops..some error happened');
        dispatch(changeLoadingStatus(false));
      }
    });
  }
};

export const formatClipers = (clipers) => {
  return (dispatch, getState) => {
    let cliperObjs = [];
    clipers.forEach((cliper) => {
      const filterClipers = cliperObjs.filter((cliperObj) => cliperObj.url === cliper.url);
      const cliperObj = {
        content: cliper.content,
        tags: cliper.tags,
        love: cliper.love,
        id: cliper.objectId
      };
      const createdAt = cliper.createdAt.split('T')[0];
      const newContentObj = {
        hasContent: cliperObj.content !== "",
        createdAt,
        clipers: [cliperObj]
      };
      if (filterClipers && filterClipers.length) {
        let filterCliper = filterClipers[0];
        const filterContents = filterCliper.contents.filter((contentObj) => contentObj.createdAt === createdAt);

        if (filterContents && filterContents.length) {
          let filterContent = filterContents[0];
          filterContent.clipers.push(cliperObj);
          filterContent.hasContent = cliperObj.content !== "";
        } else {
          filterCliper.contents.push(newContentObj);
        }
      } else {
        const newCliper = {
          title: cliper.title,
          url: cliper.url,
          contents: [newContentObj]
        };
        cliperObjs.push(newCliper);
      }
    });
    dispatch(resetClipers(cliperObjs));
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
