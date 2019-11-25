import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={innerProps =>
        localStorage.getItem('access_key') ?
          <Component accessKey={localStorage.getItem('access_key')} {...innerProps} />
          :
          <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute