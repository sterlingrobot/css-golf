import React from 'react';
import PropTypes from 'prop-types';

import { FirestoreCollection } from 'react-firestore';
import { Route } from 'react-router-dom';

import Prism from 'prismjs';

import Error from '../misc/Error';
import FirebaseAuth from '../misc/FirebaseAuth';

import ChallengeOutput from './ChallengeOutput';

import { InternalLink } from '../../styles/links';
import { Page } from '../../styles/layout';
import editor from '../../styles/editor';

import 'prismjs/themes/prism.css';
import '../../styles/challenge.scss';

const setContent = html => {
  return {
    __html: Prism.highlight(html, Prism.languages.html)
  };
};

class Challenge extends React.Component {
  render() {
    const {
      props: { match }
    } = this;
    return (
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
              <div className="challenge">
                <header>
                  <h1>{challenge.title}</h1>
                  <FirebaseAuth>
                    {({ auth }) =>
                      auth && auth.admin ? (
                        <InternalLink to={`/${challenge.slug}/edit`}>
                          <wds-button>Edit</wds-button>
                        </InternalLink>
                      ) : null
                    }
                  </FirebaseAuth>
                </header>
                <ChallengeOutput challenge={challenge} />
                <div className="challenge-markup" style={{ ...editor }}>
                  <pre>
                    <code
                      language="html"
                      dangerouslySetInnerHTML={setContent(challenge.html)}
                    />
                  </pre>
                </div>
              </div>
            );
          }}
        </FirestoreCollection>
      </Page>
    );
  }
}

export default Challenge;

Challenge.propTypes = {
  code: PropTypes.string,
  match: PropTypes.shape(Route.match)
};
