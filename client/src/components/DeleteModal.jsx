import React from 'react';
import PropTypes from 'prop-types';

const isDemo = require('src/settings.json').demo;

function DeleteModal(props) {
  const { onDelete } = props;

  return (
    <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">Are you sure you want to delete it?</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            It cannot be undone
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" disabled={isDemo} onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
