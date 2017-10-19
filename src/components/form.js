import React from 'react';
import {getFollowing} from '../util/ajax.js';

export default class Form extends React.Component {
	state = { userName: '' }
	handleSubmit = (event) => {
      event.preventDefault();
      getFollowing(this.state.userName)
        .then(users => {
            this.props.onSubmit(users);
            this.setState({userName: ''});
        });
  };
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
      	<input type="text" 
        	value={this.state.userName}
          onChange={(event) => this.setState({userName: event.target.value}) }
        placeholder="Github username" />
        <button type="submit">Show Info</button>
      </form>
    );
  }
}