import React from 'react';
import PropTypes from 'prop-types';

import { FirestoreCollection } from 'react-firestore';
import { Route } from 'react-router-dom';

import Error from '../misc/Error';
import FirebaseAuth from '../misc/FirebaseAuth';

import { InternalLink } from '../../styles/links';
import { Page } from '../../styles/layout';

const Attempt = ({ match }) => (
  <Page>
    <FirestoreCollection
      path={'attempts'}
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
            <h1>{attempt.title}</h1>
            <p>{attempt.content}</p>
            <FirebaseAuth>
              {({ auth }) =>
                auth ? (
                  <InternalLink to={`/${attempt.slug}/edit`}>Edit</InternalLink>
                ) : null
              }
            </FirebaseAuth>
          </div>
        );
      }}
    </FirestoreCollection>
  </Page>
);

export default Attempt;

Attempt.propTypes = {
  code: PropTypes.string,
  match: PropTypes.instanceOf(Route)
};
