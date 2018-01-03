import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoVisualizer from './components/RepoVisualizer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    
  }

  search (username) {
    console.log(`${username} was searched`);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let myPost = new Request('http://127.0.0.1:1128/repos', {method: 'POST', headers: myHeaders, body: JSON.stringify({username: username})});
    fetch(myPost)
      .then(response => {
        console.log('Posting');
        if (response.ok) {
          console.log('Posted!');
          return response.json();
        }  
      })
      .then(json => {
        if (json === 'Successfully Posted') {
          var myHeaders = new Headers();
          var myInit = { 
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default' };
          fetch(`/repos/${username}`, myInit)
            .then(response => {
              if (response.ok) {
                return response.json();
              }
            })
            .then(json => {
              console.log(json);
              this.setState({repos: json}, () => {console.log(this.state.repos)});
            })
        }
      })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      
      {this.state.repos.map(repo => {
        return <RepoVisualizer key={repo.repo_id} repo_name={repo.repo_name} owner={repo.owner} />
      })}

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));