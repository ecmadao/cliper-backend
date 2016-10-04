import AV from 'leancloud-storage';
import config from 'config';

const appId = config.get('leancloud.appId');
const appKey = config.get('leancloud.appKey');
const appCommentBD = config.get('leancloud.appCommentBD');
AV.init({ appId, appKey });

class Comment {
  async getComments(cliperId, userId) {
    const query = new AV.Query(appCommentBD);
    query.equalTo('userId', userId);
    query.equalTo('cliperId', cliperId);
    query.descending('createdAt');
    return await query.find();
  }

  async addComment(commentObj) {
    const CommentStorage = AV.Object.extend(appCommentBD);
    const commentStorage = new CommentStorage();
    Object.keys(commentObj).forEach((commentKey) => {
      commentStorage.set(commentKey, commentObj[commentKey]);
    });
    return await commentStorage.save();
  }

  async deleteComment(commentId) {
    const comment = AV.Object.createWithoutData(appCommentBD, commentId);
    return await comment.destroy();
  }

  async updateComment(comment) {
    const targetComment = AV.Object.createWithoutData(appCommentBD, comment.objectId);
    Object.keys(comment).forEach((commentKey) => {
      targetComment.set(commentKey, comment[commentKey]);
    });
    return await targetComment.save();
  }
}

module.exports = new Comment();
