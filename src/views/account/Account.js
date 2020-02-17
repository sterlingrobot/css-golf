import React from 'react';

import logIn from '../../actions/logIn';
import FirebaseAuth from '../misc/FirebaseAuth';
import Error from '../misc/Error';
import Profile from './Profile';
import { Page } from '../../styles/layout';

import '../../styles/account.scss';

const Account = () => (
  <Page>
    <FirebaseAuth>
      {({ isLoading, error, auth }) => {
        if (isLoading) {
          return <p>loading...</p>;
        }

        if (error) {
          return <Error error={error} />;
        }

        if (!auth) {
          return (
            <div>
              <p>Sign in to see your account</p>
              <wds-button onClick={logIn}>Sign in</wds-button>
            </div>
          );
        }

        return (
          <div className="account-profile">
            <Profile auth={auth} />
          </div>
        );
      }}
    </FirebaseAuth>
  </Page>
);

export default Account;
