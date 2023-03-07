import styles from "../styles/auth.module.sass";
import { useSelector } from "react-redux";
import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import { useState } from "react";

export default function Register() {
  const [message, setMessage] = useState<string>("");

  async function sub(e: any) {
    e.preventDefault();
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password1: e.target.password1.value,
      password2: e.target.password2.value
    };
    fetch("http://localhost:3000/api/users/create", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => {
        if(!res.message) return setMessage("ok");
        if(res.message) return setMessage(res.message);
      });
  }

  if(useSelector((state:any) => state).login) {
    return (
      <div>You&apos;re yet logged in.</div>
    );

  } else {
    return (
      <section className={styles.section}>
        <form onSubmit={(e:any) => sub(e)} className={styles.sectionForm}>
          {
            message === "Might it busy?" ? <span style={{color:"red", textDecoration:"underline"}}>{message}</span> : null
          }
          {
            message === "ok" ? <span style={{color:"green", textDecoration:"underline"}}>
              You&apos;re just registred,<br />now come to login page.
            </span> : null
          }
          <label>
            <h2>Register</h2>
          </label>
          <Input required name="name" placeholder="Name"/>
          <Input required name="email" placeholder="Email"/>
          <Input required type="password" name="password1" placeholder="Password 1"/>
          <Input required type="password" name="password2" placeholder="Password 2"/>
          <Button>Submit</Button>
        </form>
      </section>
    );
  }
}