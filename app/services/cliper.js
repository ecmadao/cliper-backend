import AV from 'leancloud-storage';
import config from 'config';

const appId = config.get('leancloud.appId');
const appKey = config.get('leancloud.appKey');
const appCliperBD = config.get('leancloud.appCliperBD');

AV.init({ appId, appKey });

class Cliper {
  constructor() {
    const CliperStorage = AV.Object.extend(appCliperBD);
    this.cliperStorage = new CliperStorage();
  }

  async getClipers(userId) {
    return [];
  }

  async addCliper(cliper) {
    const newCliper = {
      content: cliper.text,
      url: cliper.url,
      title: cliper.title,
      userId: cliper.userId
    };
    return await this.cliperStorage.save(newCliper);
  }

  async getCliper(cliperId) {
    return {};
  }
}

module.exports = new Cliper();
