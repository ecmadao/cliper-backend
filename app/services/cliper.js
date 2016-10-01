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

  async getClipers() {
    return [];
  }

  async addCliper() {
    return {};
  }

  async getCliper() {
    return {};
  }
}

module.exports = new Cliper();
