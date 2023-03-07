import { GetServerSideProps } from "next";
import Comment from "@/components/comment/Comment";
import Button from "@/components/UI/Button/Button";
import styles from "../../../styles/article.module.sass";

interface IArticle {
  id: number;
  title: string;
  body: string;
  userId: number;
  rank: number;
  createdAt: string;
  Comment: IComment[];
}

interface IComment {
  id: number;
  body: string;
  createdAt: string;
  PostId: number;
  UserId: number;
  status: "AVIABLE" | "BANNED";
}

export default function Article({article}: {article:IArticle}) {
  if(!article) {
    return;

  } else {
    return (
      <div className={styles.article}>
        <div className="head">
          <h1>{article.title}</h1>
        </div>
        <div className={styles.body}>
          {article.body}
        </div>
        <div className={styles.bodyBottom}>
          <div>Rank: <Button>Increase</Button>{article.rank}<Button type="red">Decrease</Button></div>
          <p>Author: {article.userId},</p>
          <p>Created at: {new Date(article.createdAt).toLocaleDateString()},&nbsp;{new Date(article.createdAt).toLocaleTimeString()}</p>
        </div>
        <div className={styles.comments}>
          <h2>Comments</h2>
          {
            article.Comment.map((comment: IComment) => (
              <Comment comment={comment} key={comment.id} />
            ))
          }
          <div className="leaveComment">
            <Button>Leave a comment</Button>
          </div>
        </div>
      </div>
    );
  };
}

export const getServerSideProps: GetServerSideProps = async (ctx:any) => {

  const article: IArticle = await fetch("http://localhost:3000/api/posts/read/?id="+ctx.query.id)
    .then(res => res.json());

  return {
    props: {
      article: article
    }
  };
};