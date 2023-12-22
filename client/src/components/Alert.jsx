import React from 'react';
import PropTypes from 'prop-types';

import styles from 'src/components/Alert.style';

function Alert(props) {
  const { variant, children } = props;

  return (
    <div className={`alert alert-${variant}`} style={styles.alert}>
      {children}
    </div>
  );
}

Alert.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Alert;
