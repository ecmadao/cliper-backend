import AV from 'leancloud-storage';
import config from 'config';

const appId = config.get('leancloud.appId');
const appKey = config.get('leancloud.appKey');
const appCliperBD = config.get('leancloud.appCliperBD');

AV.init({ appId, appKey });

class Cliper {
  constructor() {
  }

  async getClipers(userId) {
    return [];
  }

  async addCliper(cliper) {
    const CliperStorage = AV.Object.extend(appCliperBD);
    const cliperStorage = new CliperStorage();
    cliperStorage.set('content', cliper.text);
    cliperStorage.set('url', cliper.url);
    cliperStorage.set('title', cliper.title);
    cliperStorage.set('userId', cliper.userId);
    return await cliperStorage.save();
  }

  async getCliper(cliperId) {
    return {};
  }
}

module.exports = new Cliper();
