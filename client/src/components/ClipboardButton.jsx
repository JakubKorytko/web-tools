import React, { useEffect, useState } from 'react';
import ClipboardJS from 'clipboard';
import { Tooltip } from 'bootstrap';
import PropTypes from 'prop-types';

function ClipboardButton(props) {
  const { styleProp, text } = props;

  // we just need to store the clipboard object somewhere
  const setClipboard = useState(undefined)[1];
  const copy = (e) => {
    const x = e.target;
    x.classList.add('bi-clipboard-check');
    x.classList.remove('bi-clipboard');
    x.setAttribute('title', 'Copied!');
  };

  const copyOut = (e) => {
    const x = e.target;
    setTimeout(() => {
      x.classList.add('bi-clipboard');
      x.classList.remove('bi-clipboard-check');
      x.setAttribute('title', 'Copy link');
    }, 300);
  };

  useEffect(() => {
    setClipboard(new ClipboardJS('.copy'));
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
  }, []);

  return (
    <i
      aria-label={text}
      tabIndex={0}
      role="button"
      className="copy bi bi-clipboard"
      onClick={copy}
      onKeyDown={copy}
      onMouseLeave={copyOut}
      data-toggle="tooltip"
      data-bs-placement="bottom"
      title="Copy link"
      data-clipboard-text={text}
      style={styleProp}
    />
  );
}

ClipboardButton.propTypes = {
  styleProp: PropTypes.objectOf(PropTypes.string),
  text: PropTypes.string.isRequired,
};

ClipboardButton.defaultProps = {
  styleProp: {},
};

export default ClipboardButton;
