import styles from "./styles/comment.module.sass";

interface IComment {
  id: number;
  body: string;
  createdAt: string;
  PostId: number;
  UserId: number;
  status: "AVIABLE" | "BANNED";
}

export default function Comment({comment}: {comment: IComment}) {
  return (
    <div className={styles.comment}>
      <div className="body">
        {comment.body}
      </div>
      <div className="bottom">
        {comment.UserId},&nbsp;
        {new Date(comment.createdAt).toLocaleDateString()},&nbsp; {new Date(comment.createdAt).toLocaleTimeString()}
      </div>
    </div>
  );
}