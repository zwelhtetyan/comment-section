import React from 'react';

const AddComment = ({
    currentUserImg,
    addingComment,
    message,
    handleMessage,
    handleSend,
    onBlur,
}) => {
    return (
        <form className='add-comment-container'>
            <img src={currentUserImg} alt='' className='account' />
            <textarea
                name='message'
                id=''
                className='add-comment'
                value={message}
                onChange={handleMessage}
                onBlur={onBlur}
            ></textarea>
            <button className='send' onClick={addingComment}>
                {(!message ? 'Send' : handleSend.replyable && 'Reply') ||
                    (handleSend.editable && 'Update') ||
                    'Send'}
            </button>
        </form>
    );
};

export default AddComment;
