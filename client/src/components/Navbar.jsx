import React from 'react';
import PropTypes from 'prop-types';

import Token from './Token';

function BackButton(props) {
  const { back } = props;

  if (back) {
    return <a className="navbar-brand backButton" href="./boxes">&lt;</a>;
  }
  return null;
}

BackButton.propTypes = {
  back: PropTypes.bool.isRequired,
};

function Navbar(props) {
  const logout = (ev) => {
    ev.preventDefault();
    Token.remove();
    window.open('/', '_self');
  };

  const { back, title } = props;

  return (
    <nav className="navbar fixed-top navbar-light bg-light" style={{ textAlign: 'right' }}>
      <div className="container-fluid justify-content-between">
        <div>
          <BackButton back={back} />
          <span className="navbar-brand">{title}</span>
        </div>
        <a className="navbar-brand" onClick={logout} href="/">Logout</a>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.bool.isRequired,
};

export default Navbar;
