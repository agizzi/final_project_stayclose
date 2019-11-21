import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
    return (
      <Route
        {...props}
        render={innerProps =>
          localStorage.getItem('auth_key') ?
              <Component {...innerProps} />
              :
              <Redirect to="/login" />
        }
      />
    );
  };

export default PrivateRoute