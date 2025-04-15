import './ScoreCard.css';
import CommentCard from './CommentCard';
import { useState } from 'react';
import { addComment } from '../actions/Score.action';
import { useCookies } from 'react-cookie';

export default function ScoreCard({ score_id, username, score, text, comments }) {
  const [commentText, setCommentText] = useState("");
  const [cookies] = useCookies(["user_id"]);

  const postComment = () => {
    console.log(score_id);
    addComment({
      text: commentText,
      post: score_id,
      author: cookies.user_id,
    })
    .then((response) => {
      if (response.data != null) {
        alert("Successfully post comment");
        window.location.reload();
      } else {
        alert("Failed to post comment!");
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
  }

  return (
    <div className="scorecard-container">
      <h2 className="scorecard-username">{username}</h2>
      <div className="scorecard-details">
        <p className="scorecard-score">Score: {score}</p>
        <p className="scorecard-text">{text}</p>
      </div>
      <div className="scorecard-comment-section">
        <input type="text" placeholder="Add a comment" className="scorecard-comment-input" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
        <button onClick={postComment} className="scorecard-comment-button">Comment</button>
      </div>
      <div className="scorecard-comments">
        {comments && comments.map((comment, index) => (
          <CommentCard
            key={index}
            username={comment.author.username}
            text={comment.text}
          />
        ))}
      </div>
    </div>
  );
}
