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
          dispatch(resetClipers(data.data));
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

export const RESET_CLIPERS = 'RESET_CLIPERS';
export const resetClipers = (clipers) => {
  return {
    type: RESET_CLIPERS,
    clipers
  }
};



export const handleCliperLoveStatusChange = (id, status) => {
  return (dispatch, getState) => {
    postLoveStatus(id, status);
    const {clipers} = getState();
    let targetIndex = null;
    clipers.forEach((cliper, index) => {
      if (cliper.objectId === id) {
        targetIndex = index;
      }
    });
    if (targetIndex !== null) {
      dispatch(changeCliperLoveStatus(targetIndex));
    }
  }
};

const postLoveStatus = (id, status) => {
  $.ajax({
    url: `/cliper/${id}/update?love=${status}`,
    method: 'get',
    success: (data) => {},
    error: (err) => {
      console.log(err);
    }
  });
};

export const CHANGE_CLIPER_LOVE_STATUS = 'CHANGE_CLIPER_LOVE_STATUS';
export const changeCliperLoveStatus = (index) => {
  return {
    type: CHANGE_CLIPER_LOVE_STATUS,
    index
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
