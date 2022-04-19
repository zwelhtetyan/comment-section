import React from 'react';

const AddComment = ({
    currentUserImg,
    addingComment,
    message,
    handleMessage,
}) => {
    return (
        <form className='add-comment-container' onSubmit={addingComment}>
            <img src={currentUserImg} alt='' className='account' />
            <textarea
                name='message'
                id=''
                className='add-comment'
                value={message}
                onChange={handleMessage}
            ></textarea>
            <button className='send'>Send</button>
        </form>
    );
};

export default AddComment;
