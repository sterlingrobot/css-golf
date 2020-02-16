// the main routes of our app are defined here using react-router
// https://reacttraining.com/react-router/web/example/basic

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Attempt from './attempts/Attempt'
import PostList from './posts/PostList'
import AttemptNew from './attempts/AttemptNew'
import AttemptEdit from './attempts/AttemptEdit'

import Account from './account/Account'
import Error from './misc/Error'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={PostList} />
    <Route path="/new" component={AttemptNew} />
    <Route path="/account" component={Account} />
    <Route path="/:slug/edit" component={AttemptEdit} />
    <Route path="/:slug" component={Attempt} />
    <Route component={Error} />
  </Switch>
)

export default Routes
