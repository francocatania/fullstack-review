const express = require('express');
let app = express();
const {save, Repo} = require('../database/index.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const {getReposByUsername} = require('../helpers/github.js');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(cors());


app.post('/repos', function (req, res) {
  if (!req.body) return res.sendStatus(400);
  let textInput = req.body.username;
  getReposByUsername(textInput, (repos) => {
    JSON.parse(repos).forEach(repo => save(repo));
    res.json('Successfully Posted');
  }); 

  
});

app.get('/repos/:username', function (req, res) {
  var username = req.params.username;
  Repo.find().
    where('owner').equals(username).
    sort({stars: -1 }).
    limit(25).
    exec((err, repos) => {
      if (err) res.send(err);
      res.json(repos);
    });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});