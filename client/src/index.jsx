import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    
  }

  search (term) {
    console.log(`${term} was searched`);
    let myPost = new Request('http://127.0.0.1:1128/repos', {method: 'POST', body: {username: term});
    fetch(myPost)
      .then(response => {
        if (response.ok) {
          return response.json();
        }  
      })
      .then(json => {
        this.setState({repos: json});
      })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));