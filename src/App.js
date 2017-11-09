import React, { Component } from 'react';
import './reset.css';
import './App.css';
import './index.css';
import 'react-web-tabs/dist/react-web-tabs.css';
import CardList from './components/cards';
import getFollowing from './util/ajax.js';

class App extends Component {
  state = { cards:[]};

  addCards = (data) => {
     this.setState({ cards: data });
  };

  
  componentDidMount = () =>
  {
    getFollowing().then(result => {
      this.addCards(result.data) 
    });
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>The goings on</h2>
        </div>
        <div>
          <CardList cards = {this.state.cards} />
        </div>
      </div>
    );
  }
}

export default App;
