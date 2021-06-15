import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './footer.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
var ReactDOM = require('react-dom');

export const Login = () => {
  return (
    <Fragment>
      <h1>Pet's Friends</h1>
    </Fragment>
  );
};

export default connect()(Login);
