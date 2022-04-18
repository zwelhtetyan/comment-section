import React from 'react';
import Comment from './Comment';

const Reply = () => {
    return (
        <div>
            <div className='replyWrapper'>
                <Comment name='@maxblagun' />
                <Comment />
            </div>
        </div>
    );
};

export default Reply;
