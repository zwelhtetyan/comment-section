import AddComment from './components/AddComment.jsx';
import Comment from './components/Comment.jsx';
import Reply from './components/Reply.jsx';

function App() {
    return (
        <div className='mainContainer'>
            <Comment />
            <Comment />
            <Reply />
            <AddComment />
        </div>
    );
}

export default App;
