import React from 'react';
import PropTypes from 'prop-types';

import logIn from '../../actions/logIn';
import FirebaseAuth from '../misc/FirebaseAuth';
import { Avatar } from '../account/Avatar';

import { HeaderFooterWrapper, Header, Footer } from '../../styles/layout';
import { HeaderLink } from '../../styles/links';

const Layout = ({ children }) => (
  <HeaderFooterWrapper>
    <Header>
      <HeaderLink to="/">
        <h2>CSS Golf</h2>
      </HeaderLink>

      <div>
        {' '}
        <FirebaseAuth>
          {({ isLoading, error, auth }) => {
            if (isLoading) {
              return '...';
            }
            if (error) {
              return '⚠️ login error';
            }
            if (auth) {
              return (
                <HeaderLink to={`/account`}>
                  <Avatar
                    role="img"
                    aria-label="account"
                    user={auth}
                    width="5rem"
                  />
                </HeaderLink>
              );
            }
            return <button onClick={logIn}>log in</button>;
          }}
        </FirebaseAuth>
      </div>
    </Header>

    {children}

    <Footer>© {new Date().getFullYear()}</Footer>
  </HeaderFooterWrapper>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node
};
