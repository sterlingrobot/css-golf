// the main routes of our app are defined here using react-router
// https://reacttraining.com/react-router/web/example/basic

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Attempt from './attempts/Attempt';
import AttemptNew from './attempts/AttemptNew';
// import AttemptEdit from './attempts/AttemptEdit'

import ChallengeList from './challenges/ChallengeList';
import Challenge from './challenges/Challenge';
import ChallengeNew from './challenges/ChallengeNew';
import ChallengeEdit from './challenges/ChallengeEdit';

import Account from './account/Account';
import Error from './misc/Error';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ChallengeList} />
    <Route path="/new" component={ChallengeNew} />
    <Route path="/:slug/attempt/new" component={AttemptNew} />
    <Route path="/:slug/attempt/:id" component={Attempt} />
    <Route path="/:slug/edit" component={ChallengeEdit} />
    <Route path="/:slug" component={Challenge} />
    <Route path="/account" component={Account} />
    <Route component={Error} />
  </Switch>
);

export default Routes;
