export const TABS = {
  all: '全部',
  love: '已标记'
};

export const formatClipers = (clipers) => {
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
  return cliperObjs
};
