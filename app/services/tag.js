import AV from 'leancloud-storage';
import config from 'config';

const appId = config.get('leancloud.appId');
const appKey = config.get('leancloud.appKey');
const appTagBD = config.get('leancloud.appTagBD');
AV.init({ appId, appKey });

class Tag {
  async allTags(userId) {
    const query = new AV.Query(appTagBD);
    query.equalTo('userId', userId);
    return await query.find();
  }

  async getTags(pageUrl, userId) {
    const query = new AV.Query(appTagBD);
    query.equalTo('userId', userId);
    query.equalTo('pageUrl', pageUrl);
    return await query.find();
  }

  async addTag(tagObj) {
    const TagStorage = AV.Object.extend(appTagBD);
    const tagStorage = new TagStorage();
    Object.keys(tagObj).forEach((tagKey) => {
      tagStorage.set(tagKey, tagObj[tagKey]);
    });
    return await tagStorage.save();
  }

  async deleteTag(tagId) {
    const tag = AV.Object.createWithoutData(appTagBD, tagId);
    return await tag.destroy();
  }

  async updateTag(tag) {
    const targetTag = AV.Object.createWithoutData(appTagBD, tag.objectId);
    Object.keys(tag).forEach((tagKey) => {
      targetTag.set(tagKey, tag[tagKey]);
    });
    return await targetTag.save();
  }
}

module.exports = new Tag();
