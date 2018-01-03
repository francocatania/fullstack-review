const express = require('express');
let app = express();
const {save, Repo} = require('../database/index.js');
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/../client/dist'));

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/repos', jsonParser, function (req, res) {

  if (!req.body) return res.sendStatus(400);
  let textInput = req.body.username;
  

  // and get the repo information from the github API, then
  getReposByUsername(textInput, () => { // MI CALLBACK VA A SAVEAR EN MONGO Y HACER EL RES.SEND DE ABAJO
    // save the repo information in the database
    res.send('Successfully Posted');
  }); 

  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  Repo.find((err, repos) => {
    if (err) res.send(err);
    res.send(repos.slice(0,25))
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});