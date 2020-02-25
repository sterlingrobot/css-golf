import React from 'react';
import PropTypes from 'prop-types';
import { Firestore } from 'react-firestore';

const options = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  weekday: 'short'
};

const DateFormat = ({ timestamp }) => (
  <>{new Intl.DateTimeFormat('en-US', options).format(timestamp.toDate())}</>
);

export default DateFormat;

DateFormat.propTypes = {
  timestamp: PropTypes.shape(Firestore.timestamp)
};
