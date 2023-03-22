import styles from "styles/auth.module.sass";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IUser from "@/types/user";

interface IBody {
  name?: string,
  email?: string,
  password?: string
}

interface IFormTarget {
  emailname: {value: string};
  password: {value: string};
}

export default function Login() {

  const dispatch = useDispatch();

  const [mistake, setMistake] = useState<boolean>(false);
  async function sub(
    event: FormEvent<HTMLFormElement> & {target: IFormTarget}
  ): Promise<void> {
    event.preventDefault();
    
    let body:IBody = {};
    const target: IFormTarget = event.target;
    target
      .emailname
      .value
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        === null
      ? body.name = target.emailname.value
      : body.email = target.emailname.value;
      
    body.password = target.password.value;

    const user = await fetch("http://localhost:3000/api/users/login", {
      headers: {
        "mode":"no-cors"
      },
      method: "PUT",
      body: JSON.stringify(body)
    })
      .then(res => res.json());

    if(user.message) {
      setMistake(true);
    } else {
      localStorage.setItem("token", user.token);
      dispatch({type:"set", payload:user});

      if(mistake === true) setMistake(false);
    } 
  }

  if(useSelector(
    (state: {login: IUser} | boolean) =>
      typeof state === "boolean" ? state : state.login)) {
    return <h1>You&apos;re yet logged in.</h1>;
  } else {
    return (
      <div className={styles.section}>
        <form
          className={styles.sectionForm}
          action=""
          method="POST"
          onSubmit={
            (e: FormEvent<HTMLFormElement> & {target: IFormTarget}) => sub(e)}>
          {
            mistake == true ?
              <div
                style={{color:"red", textDecoration:"underline"}}>Mistake</div>
              : null
          }
          <label>
            <h2>Login</h2>
          </label>
          <Input
            name="emailname"
            type="text"
            placeholder="Name or Email"
            required/>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required />
          <Button typeButton="submit">Submit</Button>

        </form>
      </div>
    );
  }
}