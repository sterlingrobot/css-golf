import React from 'react'

import FirebaseAuth from '../misc/FirebaseAuth'
import Error from '../misc/Error'
import logIn from '../../actions/logIn'
import createChallenge from '../../actions/createChallenge'
import ChallengeForm from './ChallengeForm'
import {
  Page,
} from '../../styles/layout'

const ChallengeNew = ({history}) => (
  <Page>
    <FirebaseAuth>
      { ({isLoading, error, auth}) => {

        if (error) {
          return <Error error={error} />
        }

        if (isLoading) {
          return <div>loading...</div>
        }

        if (!auth) {
          return <div>
            <p>You must be logged in to add posts</p>
            <button onClick={logIn}>log in</button>
          </div>
        }

        return <ChallengeForm
          onSubmit={values => createChallenge(values).then(post => history.push(`/${post.slug}`))}
        />
      }}
    </FirebaseAuth>
  </Page>
)

export default ChallengeNew
