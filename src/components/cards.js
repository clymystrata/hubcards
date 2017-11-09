// what is the component structure?
// start small and embrace refactoring
// use function components until you can't

import React, {Component} from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

const Avatar = (props) => 
  props.isCurrent ?
    <div className="avatar">
        <img src={props.url} />
    </div> :
    <p className="nameTab">{props.name}</p>


const RepoInfo = (props) => {
  return (
  <div>
    <h2 className="coBadge"><a href={props.info.url}>{props.info.name}</a></h2>
    <ul>
      <li className="coBadge">{props.info.cloneUrl}</li>
      <li className="coBadge">{props.info.sshUrl}</li>
    </ul>
  </div>);
};

const UserInfo = (props) => {
  return(
    <TabPanel tabId={`${props.id}`}>
    <div classNmae="infoTab">
      <h1 className="nameBadge">{props.name}</h1>

      {props.repos ? props.repos.map(ri => <RepoInfo key={ri.id} info={ri} />): <p>No Public Repositories</p>}
    </div>
    </TabPanel>
  );
};

const Card = (props) => {
  return (
      <Tab tabFor={`${props.id}`}>
      <div className="avTab">
          <Avatar url={props.avatar_url} 
                  cardId={props.id}
                  isCurrent={props.id == props.curId}
                  name={props.name}
          />
      </div>
      </Tab>
    );
};

class CardList extends Component {
  state = {}
  
  ChangeCard = (cardId) => {
    this.setState({curCardId: cardId});
  }
  render() {
    return(
        <Tabs vertical onChange = {(id) => this.ChangeCard(id)}>
          <TabList>
          {this.props.cards.map(card => <Card curId={this.state.curCardId} key={card.id} {...card} />)}
          </TabList>
          {this.props.cards.map(card => <UserInfo key={card.id} {...card} />)}
        </Tabs>
    )}
};

export default CardList;


