// the main routes of our app are defined here using react-router
// https://reacttraining.com/react-router/web/example/basic

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Attempt from './attempts/Attempt';
import AttemptNew from './attempts/AttemptNew';

import ChallengeList from './challenges/ChallengeList';
import Challenge from './challenges/Challenge';
import ChallengeNew from './challenges/ChallengeNew';
import ChallengeEdit from './challenges/ChallengeEdit';

import FirebaseAuth from './misc/FirebaseAuth';
import Account from './account/Account';
import SignIn from './account/SignIn';
import Error from './misc/Error';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ChallengeList} />
    <Route path="/account" component={Account} />
    <Route path="/login">
      <FirebaseAuth>
        {({ isLoading, error, auth }) => {
          if (error) {
            return <Error error={error} />;
          }

          if (isLoading) {
            return <div>loading...</div>;
          }

          if (!auth) {
            return <SignIn />;
          }

          return <Redirect to={{ pathname: '/' }} />;
        }}
      </FirebaseAuth>
    </Route>
    <Route path="/challenges/new" component={ChallengeNew} />
    <Route path="/:slug/attempt" component={AttemptNew} />
    <Route path="/attempts/:id" component={Attempt} />
    <Route
      path="/:slug/edit"
      render={({ match, history }) => (
        <FirebaseAuth>
          {({ isLoading, error, auth }) => {
            if (error) {
              return <Error error={error} />;
            }

            if (isLoading) {
              return <div>loading...</div>;
            }

            if (!auth || !auth.admin) {
              return <Redirect to={{ pathname: `/${match.params.slug}` }} />;
            }

            return <ChallengeEdit {...{ match, history }} />;
          }}
        </FirebaseAuth>
      )}
    />
    <Route path="/:slug" component={Challenge} />
    <Route component={Error} />
  </Switch>
);

export default Routes;
