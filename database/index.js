const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher')
.then(
  () => console.log('Successfully connected to fetcher db'),
  (err) => console.log(err)
)

let repoSchema = mongoose.Schema({
  repo_id: {
    type: Number,
    unique: true,
    required: true,
    dropDups: true
  },
  repo_name: String,
  url: String,
  stars: Number,
  created_at: Date,
  owner: {
    type: String,
    lowercase: true,
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
}, {runSettersOnQuery: true});

let Repo = mongoose.model('Repo', repoSchema);

let save = (json) => { //ON SERVER SIDE I HAVE TO MAKE SURE I AM PASSING A SINGLE REPO AS AN ARGUMENT, 
                       //MAYBE USING FOREACH

  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let dbJson = {
    repo_id: json.id,
    repo_name: json.name,
    url: json.html_url,
    stars: json.stargazers_count,
    repo_created_at: json.created_at,
    owner: json.owner.login,
  };
  Repo.create(dbJson);
}

module.exports.save = save;
module.exports.Repo = Repo;