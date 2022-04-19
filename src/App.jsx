import { useState } from 'react';
import AddComment from './components/AddComment.jsx';
import Comment from './components/Comment.jsx';
import Data from './data.js';

function App() {
    const [currentUser, setCurrentUser] = useState(Data.currentUser);
    const [comments, setComment] = useState(Data.comments);

    const handleVoteSystem = (e) => {
        const scoreContainer = e.currentTarget.parentElement.parentElement;
        const buttons = scoreContainer.querySelectorAll('.btn');
        const currentBtn = e.currentTarget.parentElement;

        buttons.forEach((btn) => {
            btn.children[0].children[0].style.fill = 'hsl(238, 40%, 52%)';
            btn.classList.remove('done');

            currentBtn.classList.add('done');

            if (currentBtn.classList.contains('done')) {
                currentBtn.children[0].children[0].style.fill =
                    'hsl(239, 57%, 85%)';
            }
        });
    };

    const handlePlus = (id, e) => {
        if (e.currentTarget.parentElement.classList.contains('done')) return;
        handleVoteSystem(e);
        setComment((comments) =>
            comments.map((cmt) =>
                cmt.id === id
                    ? { ...cmt, score: cmt.score + 1 }
                    : cmt.replies.length === 0
                    ? cmt
                    : {
                          ...cmt,
                          replies: cmt.replies.map((cmt) =>
                              cmt.id === id
                                  ? { ...cmt, score: cmt.score + 1 }
                                  : cmt
                          ),
                      }
            )
        );
    };

    const handleMinus = (id, e) => {
        if (e.currentTarget.parentElement.classList.contains('done')) return;
        handleVoteSystem(e);
        setComment((comments) =>
            comments.map((cmt) =>
                cmt.id === id
                    ? { ...cmt, score: cmt.score - 1 }
                    : cmt.replies.length === 0
                    ? cmt
                    : {
                          ...cmt,
                          replies: cmt.replies.map((cmt) =>
                              cmt.id === id
                                  ? { ...cmt, score: cmt.score - 1 }
                                  : cmt
                          ),
                      }
            )
        );
    };

    const showComments = comments.map((comment) => {
        return (
            <div key={comment.id}>
                <Comment
                    avatar={comment.user.image.webp}
                    username={comment.user.username}
                    createdAt={comment.createdAt}
                    score={comment.score}
                    content={comment.content}
                    handlePlus={(e) => handlePlus(comment.id, e)}
                    handleMinus={(e) => handleMinus(comment.id, e)}
                />
                <div className='replyWrapper'>
                    {comment.replies.length !== 0 &&
                        comment.replies.map((reply) => {
                            return (
                                <Comment
                                    key={reply.id}
                                    you={
                                        reply.user.username === 'juliusomo' &&
                                        true
                                    }
                                    replyingTo={reply.replyingTo}
                                    avatar={reply.user.image.webp}
                                    username={reply.user.username}
                                    createdAt={reply.createdAt}
                                    score={reply.score}
                                    content={reply.content}
                                    handlePlus={(e) => handlePlus(reply.id, e)}
                                    handleMinus={(e) =>
                                        handleMinus(reply.id, e)
                                    }
                                />
                            );
                        })}
                </div>
            </div>
        );
    });

    return (
        <div className='mainContainer'>
            {showComments}
            <AddComment currentUserImg={currentUser.image.webp} />
        </div>
    );
}

export default App;
