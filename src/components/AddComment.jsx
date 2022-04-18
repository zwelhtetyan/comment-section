import React from 'react';

const AddComment = () => {
    return (
        <div className='add-comment-container'>
            <img
                src='images/avatars/image-amyrobson.png'
                alt=''
                className='account'
            />
            <textarea name='' id='' className='add-comment'></textarea>
            <button className='send'>Send</button>
        </div>
    );
};

export default AddComment;
