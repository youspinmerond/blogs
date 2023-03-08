import styles from "../styles/createpost.module.sass";
import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import { useSelector } from "react-redux";
import { FormEvent } from "react";

export default function CreatePage() {
  const user = useSelector((state:any) => state).login;

  function sub(e: FormEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string },
      body: { value: string }
    };

    const body = {
      title: target.title.value,
      body: target.body.value
    };
    
    fetch("http://localhost:3000/api/posts/create", {
      method: "POST",
      body: JSON.stringify({post: body, token: localStorage.getItem("token") })
    })
      .then(res => res.json())
      .then(res => {
        if(res.id) {
          location.href = "http://localhost:3000/article/"+res.id;
        }
      });
  }

  if(user === false) {
    return <section className={styles.section}><h1>You&apos;re not logged in.</h1></section>;
  } else {
    return (
      <>
        <section className={styles.section}>
          <h1>Author: {user.name},</h1>
          <h1>Article:  </h1>
          <form onSubmit={(e: FormEvent) => sub(e)}>
            <Input placeholder="Title" name="title" required/>
            <textarea
              name="body"
              className={styles.textarea}
              placeholder="Body"
              minLength={100}
              style={
                {
                  minWidth:"100%",
                  maxWidth:"100%",
                  minHeight:"25rem",
                  maxHeight:"25rem"
                }
              }>
            </textarea>
            <div className={styles.right}>
              <Button>Submit</Button>
            </div>
          </form>
        </section>
        <section className={styles.section}>
          <h1>FAQ</h1>
          <ul className={styles.ul}>
            <h2>Markdown</h2>
            <li><b>**bold**</b></li>
            <li><i>*italic*</i></li>
            <li><del>~~del~~</del></li>
            <li><a href="#">[text](http://127.0.0.1:3000)</a></li>
            <li>
              <ul>
                <li><h1># 1 Level</h1></li>
                <li><h2>## 2 Level</h2></li>
                <li><h3>### 3 Level</h3></li>
                <li><h4>#### 4 Level</h4></li>
              </ul>
            </li>
            <li>
              <ul>
                <h2>Also!</h2>
                <p>You can combine those.</p>
                <li>
                  <b><i>***Bold, italic***</i></b>
                </li>
                <li><h2><b># **Bold**</b></h2></li>
              </ul>
            </li>
          </ul>
        </section>
      </>
    );
  }
}