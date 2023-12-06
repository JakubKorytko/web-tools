const isDemo = require("../settings.json").demo;

const DeleteModal = (props) => {
        return (
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">Are you sure you want to delete it?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        It cannot be undone
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {isDemo ? <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={alert("Not available in demo mode!")}>Delete</button> :
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onDelete}>Delete</button>}
                    </div>
                </div>
            </div>
        </div>
        );
}

export default DeleteModal;