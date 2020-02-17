import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { FirestoreCollection } from 'react-firestore';

import Error from '../misc/Error';
import deleteAttempt from '../../actions/deleteAttempt';
import updateAttempt from '../../actions/updateAttempt';
import AttemptForm from './AttemptForm';

import { Page } from '../../styles/layout';

const AttemptEdit = ({ match, history }) => (
  <Page>
    <FirestoreCollection
      path={'posts'}
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

        const attempt = data[0];

        return (
          <div>
            <AttemptForm
              attempt={attempt}
              onSubmit={values =>
                updateAttempt(attempt.id, values).then(() =>
                  history.push(`/${attempt.slug}`)
                )
              }
            />
            <br />
            <button
              onClick={() =>
                deleteAttempt(attempt).then(() => history.push(`/`))
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

export default AttemptEdit;

AttemptEdit.propTypes = {
  match: PropTypes.instanceOf(Route.match),
  history: PropTypes.instanceOf(Route.history),
};
