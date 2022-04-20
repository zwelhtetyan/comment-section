import React from 'react';

const Delete = ({ handleCancel, completelyDelete }) => {
    return (
        <div className='delete-alert-container'>
            <div className='delete-card'>
                <h3 className='delete-title'>Delete Comment</h3>
                <p className='delete-description'>
                    Are you sure want to delete this comment? This will remove
                    the comment and can't be undone.
                </p>
                <div className='button-container'>
                    <div className='cancel button' onClick={handleCancel}>
                        no, cancel
                    </div>
                    <div className='delete button' onClick={completelyDelete}>
                        yes, delete
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Delete;
