import axios from "axios";
import { GetServerSideProps } from "next";
import Comment from "@/components/comment/Comment";
import Button from "@/components/UI/Button/Button";
import styles from "../../../styles/article.module.sass";
import { useSelector } from "react-redux";
import { FormEvent, useRef, useState } from "react";
import IUser from "@/types/user";

interface IArticle {
  id: number;
  title: string;
  body: string;
  userId: number;
  rank: number;
  createdAt: string;
  Comment: IComment[];
};

interface IComment {
  id: number;
  body: string;
  createdAt: string;
  PostId: number;
  UserId: number;
  status: "AVIABLE" | "BANNED";
}

export default function Article(
  {article}: {article:IArticle | {message: string}}
) {
  const user = useSelector(
    (state: {login: IUser} | boolean) => typeof state === "boolean" ?
      state : state.login
  );

  const [mistake, setMistake] = useState<string | null>(null);
  const [attention, setAttention] = useState<string | null>(null);

  const leaveComment = useRef<
    HTMLDivElement | null
    >(null);
  const comments = useRef<HTMLDivElement | null>(null);
  
  function showComment() {
    if(leaveComment.current === null) return;

    const display = leaveComment.current.style.display;
    if(display === "none") {
      leaveComment.current.style.display = "block";
    } else {
      leaveComment.current.style.display = "none";
    }
  }

  function sub(e: FormEvent) {
    if("message" in article) return;
    e.preventDefault();
    const target = e.target as typeof e.target & { body: {value: string}};

    const body = {
      comment: {
        PostId: article.id,
        body: target.body.value
      },
      token: localStorage.getItem("token")
    };
    fetch("http://localhost:3000/api/comments/create", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => res.id ? res : setMistake(res.message));
    body;
  }

  function deleteArticle() {
    if("message" in article) return;
    axios.delete("/api/posts/"+article.id);
  }

  function score(score: "UP" | "DOWN") {
    if("message" in article) return;

    const body = {
      score: score,
      articleId: article.id,
      token: localStorage.getItem("token")
    };

    axios.post("/api/posts/"+article.id+"/vote", body)
      .then((res) => !res.data ?
        setAttention("No answer") : setAttention("Voted")
      )
      .catch(e => !e ? null : setAttention(JSON.stringify(e)));
  }

  if("message" in article) {
    return <h1>{article.message}</h1>;
  } else {
    return (
      <div className={styles.article}>
        <div className={styles.head}>
          <h1>{article.title}</h1>
          {
            typeof user !== "boolean" ? user.id === article.userId ?
              <Button type="red" onClick={() => deleteArticle()}>Delete</Button>
              : null : null
          }
        </div>
        <div className={styles.body}>
          {article.body}
        </div>
        <div className={styles.bodyBottom}>
          {attention !== null ? <span>{attention}</span> : null}
          <div>
            Rank:
            <Button onClick={() => score("UP")}>Increase</Button>
            {article.rank}
            <Button onClick={
              () => score("DOWN")
            }
            type="red">
              Decrease
            </Button>
          </div>
          <p>Author: {article.userId},</p>
          <p>
            Created at:
            {new Date(article.createdAt).toLocaleDateString()},
            &nbsp;{new Date(article.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <div ref={comments} className={styles.comments}>
          <h2>Comments</h2>
          {
            article.Comment ? article.Comment.map((comment: IComment) => (
              <Comment comment={comment} key={comment.id} />
            )) : null
          }
          <div className="leaveComment">
            { user === false ? null
              : (
                <>
                  <Button onClick={showComment}>Leave a comment</Button>
                  <div
                    style={{display:"none"}}
                    className={styles.leaveComment}
                    ref={leaveComment}>
                    {
                      mistake === null ?
                        null
                        : <div style={{color:"red"}}>{mistake}</div>
                    }
                    <form onSubmit={(e) => sub(e)} method="post">
                      <textarea
                        name="body"
                        placeholder="Body"
                        minLength={30}
                        style={
                          {
                            minHeight:"6rem",
                            maxHeight:"6rem",
                            maxWidth:"12rem",
                            minWidth:"12rem"
                          }
                        }></textarea>
                      <Button>Submit</Button>
                    </form>
                  </div>
                </>
              ) }
          </div>
        </div>
      </div>
    );
  };
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const article: IArticle = await fetch(
    "http://localhost:3000/api/posts/read/?id="+ctx.query.id
  )
    .then(res => res.json());

  return {
    props: {
      article: article
    }
  };
};