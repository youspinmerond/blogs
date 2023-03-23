import styles from "../styles/auth.module.sass";
import { useDispatch, useSelector } from "react-redux";
import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import { FormEvent, useState } from "react";
import IUser from "@/types/user";
import axios from "axios";

interface IFormTarget {
  name: {value: string};
  email: {value: string};
  password1: {value: string};
  password2: {value: string};
}

export default function Register() {

  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");

  async function sub(e: FormEvent & {target: IFormTarget}) {
    e.preventDefault();
    const target: IFormTarget = e.target;
    const body = {
      name: target.name.value,
      email: target.email.value,
      password1: target.password1.value,
      password2: target.password2.value
    };
    axios.post("/api/users/", {
      body: JSON.stringify(body)
    })
      .then(res => {
        if(!res.data.message) {
          dispatch({type:"set", payload:res});
          setMessage("ok");
          return;
        };
        if(res.data.message) return setMessage(res.data.message);
      });
  }

  if(useSelector(
    (state:{login: IUser} | boolean) =>
      typeof state === "boolean" ? state : state.login)) {
    return (
      <div>You&apos;re yet logged in.</div>
    );

  } else {
    return (
      <section className={styles.section}>
        <form
          onSubmit={
            (e: FormEvent<HTMLFormElement> & {target: IFormTarget}) => sub(e)
          }
          className={styles.sectionForm}>
          {
            message === "Might it busy?" ?
              <span style={{color:"red", textDecoration:"underline"}}>
                {message}
              </span>
              : null
          }
          {
            message === "ok" ?
              <span style={{color:"green", textDecoration:"underline"}}>
                You&apos;re just registred,<br />now come to login page.
              </span>
              : null
          }
          <label>
            <h2>Register</h2>
          </label>
          <Input required name="name" placeholder="Name"/>
          <Input required name="email" placeholder="Email"/>
          <Input
            required
            type="password"
            name="password1"
            placeholder="Password 1"/>
          <Input
            required
            type="password"
            name="password2"
            placeholder="Password 2"/>
          <Button typeButton="submit">Submit</Button>
        </form>
      </section>
    );
  }
}