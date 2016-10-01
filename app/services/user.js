import AV from 'leancloud-storage';
import config from 'config';

const appId = config.get('leancloud.appId');
const appKey = config.get('leancloud.appKey');
const appUserDB = config.get('leancloud.appUserDB');

AV.init({ appId, appKey });

class User {
  constructor() {
    // const UserStorage = AV.Object.extend(appUserDB);
    // this.userStorage = new UserStorage();
  }

  async signUp(email, password) {
    const user = new AV.User();
    user.setUsername(email);
    user.setPassword(password);
    user.setEmail(email);
    return await user.signUp();
  }

  async logIn(email, password) {
    return await AV.User.logIn(email, password);
  }

  async logout() {
    return await AV.User.logOut();
  }

  async currentUser() {
    return await AV.User.current();
  }
}

module.exports = new User();
