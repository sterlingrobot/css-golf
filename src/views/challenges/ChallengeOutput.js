import React from 'react';
import PropTypes from 'prop-types';

import FirebaseAuth from '../misc/FirebaseAuth';
import Error from '../misc/Error';

import { OutputImg } from '../../styles/challenge';
import '../../styles/challenge.scss';

const setContent = html => {
  return { __html: html };
};

// eslint-disable-next-line react/display-name
const ChallengeOutput = React.forwardRef(({ challenge }, ref) => (
  <div
    id={`challenge-${challenge.id}`}
    ref={ref}
    className="challenge-container"
  >
    <FirebaseAuth>
      {({ isLoading, error, auth }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <div>loading...</div>;
        }

        if (auth && auth.admin === true) {
          return (
            <>
              <style>{challenge.style}</style>
              <div
                className="challenge-content"
                dangerouslySetInnerHTML={setContent(challenge.html)}
              ></div>
            </>
          );
        }
        return <OutputImg src={challenge.snapshot} />;
      }}
    </FirebaseAuth>
  </div>
));

export default ChallengeOutput;

ChallengeOutput.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.string,
    html: PropTypes.string,
    css: PropTypes.string,
    style: PropTypes.string,
    snapshot: PropTypes.string
  })
};
