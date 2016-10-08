import AV from 'leancloud-storage';
import config from 'config';

const appId = config.get('leancloud.appId');
const appKey = config.get('leancloud.appKey');
const appCliperBD = config.get('leancloud.appCliperBD');

AV.init({ appId, appKey });

class Cliper {
  constructor() {}

  cliperQuery(queryObj) {
    const query = new AV.Query(appCliperBD);
    Object.keys(queryObj).forEach((key) => {
      query.equalTo(key, queryObj[key]);
    });
    query.descending('createdAt');
    return query;
  }

  async getClipers(queryObj, matchString = null) {
    const query = this.cliperQuery(queryObj);
    if (matchString) {
      query.contains('content', matchString);
    }
    return await query.find();
  }

  async addCliper(cliper) {
    const CliperStorage = AV.Object.extend(appCliperBD);
    const cliperStorage = new CliperStorage();
    cliperStorage.set('content', cliper.text);
    cliperStorage.set('url', cliper.url);
    cliperStorage.set('title', cliper.title);
    cliperStorage.set('userId', cliper.userId);
    cliperStorage.set('tags', []);
    cliperStorage.set('love', false);
    return await cliperStorage.save();
  }

  async getCliper(cliperId) {
    return {};
  }

  async deleteCliper(cliperId) {
    const cliper = AV.Object.createWithoutData(appCliperBD, cliperId);
    return await cliper.destroy();
  }

  async changeCliperLoveStatus(cliperId, status) {
    const cliper = AV.Object.createWithoutData(appCliperBD, cliperId);
    cliper.set('love', status);
    await cliper.save();
    return true;
  }

  async getUserClipersNum(userId) {
    const query = new AV.Query(appCliperBD);
    query.equalTo('userId', userId);
    query.notEqualTo('content', "");
    return await query.count();
  }

  async getUserPagesNum(userId) {
    const query = new AV.Query(appCliperBD);
    query.equalTo('userId', userId);
    query.equalTo('content', "");
    return await query.count();
  }
}

module.exports = new Cliper();
