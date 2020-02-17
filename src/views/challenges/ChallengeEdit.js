import React from 'react';
import { FirestoreCollection } from 'react-firestore';

import Error from '../misc/Error';
import deleteChallenge from '../../actions/deleteChallenge';
import updateChallenge from '../../actions/updateChallenge';
import ChallengeForm from './ChallengeForm';

import { Page } from '../../styles/layout';
import { ChallengeOutput } from './ChallengeOutput';

const ChallengeEdit = ({ match, history }) => (
  <Page>
    <FirestoreCollection
      path={'challenges'}
      filter={['slug', '==', match.params.slug]}
    >
      {({ error, isLoading, data }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <p>loading...</p>;
        }

        if (data.length === 0) {
          return <Error />;
        }

        const challenge = data[0];

        return (
          <div>
            <ChallengeOutput challenge={challenge} />
            <ChallengeForm
              challenge={challenge}
              onSubmit={values =>
                updateChallenge(challenge.id, values).then(() =>
                  history.push(`/${challenge.slug}/edit`)
                )
              }
            />
            <br />
            <button
              onClick={() =>
                deleteChallenge(challenge).then(() => history.push(`/`))
              }
            >
              Delete post
            </button>
          </div>
        );
      }}
    </FirestoreCollection>
  </Page>
);

export default ChallengeEdit;
