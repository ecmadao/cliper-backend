export const DEFAULT_STATE = {
  clipers: [],
  tags: [],
  activeTags: [],
  cliper: {
    url: '',
    id: null,
    tags: [],
    title: '',
    love: false,
    content: '',
    comments: []
  },
  csrf: null,
  loading: true,
  search: '',
  avtiveTab: 0,
  comment: {
    comments: [],
    commentModalActive: false,
    commentModalLoading: false,
    commentContent: '',
    currentCliper: null
  }
};
