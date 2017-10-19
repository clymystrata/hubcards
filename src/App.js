import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import 'react-web-tabs/dist/react-web-tabs.css';
import CardList from './components/cards';
import Form from './components/form';

class App extends Component {
  state = { cards: []};
  
    addCards = (data) => {
      this.setState(prevState => ({ cards: data }));
    };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <Form onSubmit={this.addCards}/>
          <CardList cards = {this.state.cards} />
        </div>
      </div>
    );
  }
}

export default App;
