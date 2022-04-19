import React from 'react';

const AddComment = ({ currentUserImg }) => {
    return (
        <div className='add-comment-container'>
            <img src={currentUserImg} alt='' className='account' />
            <textarea name='' id='' className='add-comment'></textarea>
            <button className='send'>Send</button>
        </div>
    );
};

export default AddComment;
