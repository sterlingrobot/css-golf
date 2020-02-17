import React from 'react'
import PropTypes from 'prop-types';
import Firebase from 'firebase/app'
import { FirestoreProvider } from 'react-firestore'
import { BrowserRouter, Route } from 'react-router-dom'

import ErrorBoundary from './misc/ErrorBoundary'
import Routes from './Routes'
import Layout from './layout/Layout'

// scroll to top on route change
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md#scroll-to-top
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.string
}

const App = () => (
  <FirestoreProvider firebase={Firebase}>
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <Route path="/" component={ScrollToTop}/>
          <Routes />
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  </FirestoreProvider>
)

export default App
