import { useState } from 'react';
import AddComment from './components/AddComment.jsx';
import Comment from './components/Comment.jsx';
import Data from './data.js';
import { nanoid } from 'nanoid';

function App() {
    const [currentUser, setCurrentUser] = useState(Data.currentUser);
    const [comments, setComment] = useState(Data.comments);
    const [message, setMessage] = useState('');
    const [handleSend, setHandleSend] = useState({
        replyable: false,
        editable: false,
    });
    const [replyingTo, setReplyingTo] = useState('');

    const handleVoteSystem = (e) => {
        const scoreContainer = e.currentTarget.parentElement.parentElement;
        const buttons = [...scoreContainer.querySelectorAll('.btn')];
        const currentBtn = e.currentTarget.parentElement;

        const isDone = buttons.some((btn) => btn.classList.contains('done'));

        buttons.forEach((btn) => {
            btn.children[0].children[0].style.fill = 'hsl(238, 40%, 52%)';
            btn.classList.remove('done');

            if (!isDone) {
                currentBtn.classList.add('done');
            } else {
                buttons.forEach((btn) => btn.classList.remove('done'));
            }

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

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const creatingObject = (message, name) => {
        const myComment = {
            id: nanoid(),
            content: message,
            createdAt: 'just now',
            score: 0,
            replyingTo: name,
            user: {
                image: {
                    png: './images/avatars/image-juliusomo.png',
                    webp: './images/avatars/image-juliusomo.webp',
                },
                username: 'juliusomo',
            },
            replies: [],
        };
        return myComment;
    };

    const addingComment = (e) => {
        e.preventDefault();
        setMessage('');
        setHandleSend({ replyable: false, editable: false });
        const msg = message.split(' ').slice(1); // already setup mention name in comment component (line:112)

        const method = e.target.innerText;
        console.group(method);

        document.querySelector('.add-comment').value.length !== 0 &&
            method === 'SEND' &&
            setComment((prevComment) => [
                ...prevComment,
                creatingObject(message, ''),
            ]);

        method === 'REPLY' &&
            setComment((prevComment) => [
                ...prevComment.map((cmt) =>
                    cmt.user.username === replyingTo
                        ? {
                              ...cmt,
                              replies: [
                                  ...cmt.replies,
                                  creatingObject(msg, replyingTo),
                              ],
                          }
                        : cmt.replies.length === 0
                        ? cmt
                        : {
                              ...cmt,
                              replies: cmt.replies.map((comment) =>
                                  comment.user.username === replyingTo
                                      ? {
                                            ...cmt.replies,
                                            ...creatingObject(msg, replyingTo),
                                        }
                                      : comment
                              ),
                          }
                ),
            ]);
    };

    const onBlur = () => {
        const isMessage = document.querySelector('.add-comment').value;
        !isMessage && setHandleSend({ replyable: false, editable: false });
    };

    const handleReply = (username) => {
        setHandleSend((prev) => ({ ...prev, replyable: !prev.replyable }));
        document.querySelector('.add-comment').focus();

        setMessage(`@${username} `);
        setReplyingTo(username);
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
                    you={comment.user.username === 'juliusomo' && true}
                    handlePlus={(e) => handlePlus(comment.id, e)}
                    handleMinus={(e) => handleMinus(comment.id, e)}
                    handleReply={() => handleReply(comment.user.username)}
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
                                    handleReply={() =>
                                        handleReply(reply.user.username)
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
            <AddComment
                currentUserImg={currentUser.image.webp}
                addingComment={addingComment}
                message={message}
                handleMessage={handleMessage}
                handleSend={handleSend}
                onBlur={onBlur}
            />
        </div>
    );
}

export default App;
