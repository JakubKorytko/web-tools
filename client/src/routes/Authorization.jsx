import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loader from 'src/components/Loader';
import Token from 'src/components/Token';

const serverName = process.env.REACT_APP_SERVER_URL;

function Authorization(props) {
  const [res, setRes] = useState(undefined);

  const { loginPage, path } = props;

  useEffect(() => {
    fetch(`${serverName}/auth`, {
      method: 'POST',
      headers: {
        Authorization: Token.value,
      },
    }).then((x) => x.json()).then((x) => setRes(x.res));
  }, []);

  if (loginPage === true) {
    if (res === false) { return path; }
    if (res === undefined) { return <Loader />; }
    return <Navigate to="/boxes" />;
  } if (res === false) { return <Navigate to="/" />; }
  if (res === undefined) { return <Loader />; }
  return path;
}

Authorization.propTypes = {
  loginPage: PropTypes.bool,
  path: PropTypes.element.isRequired,
};

Authorization.defaultProps = {
  loginPage: false,
};

export default Authorization;
