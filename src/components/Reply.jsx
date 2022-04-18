import React from 'react';
import Comment from './Comment';

const Reply = () => {
    return (
        <div>
            <div className='replyWrapper'>
                <Comment name='@maxblagun' />
                <Comment name='@maxblagun' you='you' />
            </div>
        </div>
    );
};

export default Reply;
