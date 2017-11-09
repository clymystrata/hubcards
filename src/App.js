import React, { Component } from 'react';
import logo from './logo.svg';
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
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <CardList cards = {this.state.cards} />
        </div>
      </div>
    );
  }
}

export default App;
