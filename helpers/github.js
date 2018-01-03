const request = require('request');
const config = require('../config.js');
const GITHUB_URL = 'https://api.github.com'

let getReposByUsername = (username, cb) => {
  
  let options = {
    url: `${GITHUB_URL}/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, ((error, response, data) => {
    if (error) {
      console.log(error);
    } else {
      cb(data);
    }
  }));

}

module.exports.getReposByUsername = getReposByUsername;