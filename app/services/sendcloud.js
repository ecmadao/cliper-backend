import config from 'config';
import request from 'request';

const apiUser = config.get('sendcloud.apiUser');
const apiKey = config.get('sendcloud.apiKey');
const githubLink = config.get('links.github');
const sendTemplateLink = config.get('sendcloud.sendTemplateLink');
const registerMailTemplate = config.get('sendcloud.templates.register');

class SendCloud {
  sendRegisterEmail(email) {
    let subVar = this.combineSendParams(email);
    subVar['sub']['%url%'] = [githubLink];
    const params = {
      "api_user": apiUser,
      "api_key": apiKey,
      "template_invoke_name": registerMailTemplate,
      "substitution_vars": JSON.stringify(subVar),
      "from": "welcome@ecmadao.com",
      "fromname": "ecmadao",
      "subject": "感谢注册Cliper",
      "resp_email_id": "true"
    }
    request.post(sendTemplateLink, {form: params}, (err, httpResponse, body) => {
    });
  }

  combineSendParams(email, option = {}) {
    return {
      to: [email],
      sub: option
    }
  }
}

module.exports = new SendCloud();
