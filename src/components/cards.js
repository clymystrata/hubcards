// what is the component structure?
// start small and embrace refactoring
// use function components until you can't

import React from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

const Avatar = (props) => {
  return (
    <div className="avatar">
        <img src={props.url} />
    </div>
  );
};

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
    <TabPanel tabId={props.id}>
      <h1 className="nameBadge">{props.name}</h1>

      {props.repos ? props.repos.map(ri => <RepoInfo key={ri.id} info={ri} />): <p>No Public Repositories</p>}
    </TabPanel>
  );
};

const Card = (props) => {
  return (
      // "javascript" styling (not inline CSS)
      // can be used to dynamically generate styles.
      // normal CSS needs to use className instead of class
      <Tab tabFor={props.id}>
          <Avatar url={props.avatar_url} />
      </Tab>
    );
};

const CardList = (props) => {
  const defaultCard = props.cards.length > 0 ? props.cards[0].id : null;
	return (
  	<Tabs defaultTab={defaultCard} vertical>
      <TabList>
    	{props.cards.map(card => <Card key={card.id} {...card} />)}
      </TabList>
      {props.cards.map(card => <UserInfo key={card.id} {...card} />)}
    </Tabs>
  );
}

export default CardList;


