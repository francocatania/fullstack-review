const request = require('request');
const config = require('../config.js');
const GITHUB_URL = 'https://api.github.com'

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
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
      console.log('github.js data: ', data);
      console.log('github.js data type: ', typeof data);
    }
  }))

}

module.exports.getReposByUsername = getReposByUsername;