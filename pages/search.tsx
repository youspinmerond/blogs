import styles from "../styles/search.module.sass";
import Result from "@/components/result/Result";
import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import { useState } from "react";

export default function Search() {

  const [ results, setResults ] = useState<any>(undefined);

  async function sub(e: any) {
    e.preventDefault();

    const resultFetch = await fetch("http://localhost:3000/api/search", {
      method: "POST",
      body: JSON.stringify({query: e.target.query.value})
    })
      .then(res => res.json());
    setResults(resultFetch);
    if(!results) return setResults({});
  }
  return (
    <section className={styles.section}>
      <h1>What do you want to find?</h1>
      <br />
      <form onSubmit={(event: any) => {
        sub(event);
      }}>
        <Input name="query" type="search" placeholder="Search"/>
        <Button>Submit query</Button>
      </form>
      
      <div className={styles.results}>
        <h1>Results:</h1>
        <div className={styles.resultsList}>
          {
            results !== undefined && "users" in results ? 
              results.users.map((user: any) => {
                return <Result
                  key={user.id}
                  name={user.name}
                  type="user"
                  createdAt={user.createdAt} />;
              })
              : <div>undefined</div>
          }
          {
            results !== undefined && "postsByTitle" in results ? 
              results.postsByTitle.map((post: any) => {
                return <Result
                  key={post.id}
                  name={post.title}
                  type="post title"
                  createdAt={post.createdAt} />;
              })
              : null
          }
          {
            results !== undefined && "postsByBody" in results ? 
              results.postsByBody.map((post: any) => {
                return <Result
                  key={post.id}
                  name={post.title}
                  type="post body"
                  createdAt={post.createdAt} />;
              })
              : null
          }
          {
            results !== undefined && "comments" in results ? 
              results.comments.map((comment: any) => {
                return <Result
                  key={comment.id}
                  name={comment.id}
                  type="comment"
                  createdAt={comment.createdAt} />;
              })
              : null
          }
          
        </div>
      </div>
    </section>
  );
}