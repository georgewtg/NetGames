import './CommentCard.css'

export default function CommentCard({ username, text }) {
  return (
    <div className="comment-card">
      <h3 className="comment-username">{username}</h3>
      <p className="comment-text">{text}</p>
    </div>
  );
}
