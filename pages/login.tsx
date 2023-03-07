import styles from "styles/auth.module.sass";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IBody {
  name?: string,
  email?: string,
  password?: string
}

export default function Login() {

  const dispatch = useDispatch();

  const [mistake, setMistake] = useState<boolean>(false);
  async function sub(event: any ) {
    event.preventDefault();
    
    let body:IBody = {};
    
    event.target.emailname.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null
      ? body.name = event.target.emailname.value : body.email = event.target.emailname.value;
      
    body.password = event.target.password.value;

    const user = await fetch("http://localhost:3000/api/users/login", {
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

  if(useSelector((state:any) => state).login) {
    return <h1>You&apos;re yet logged in.</h1>;
  } else {
    return (
      <div className={styles.section}>
        <form className={styles.sectionForm} action="" method="POST" onSubmit={(e): any => sub(e)}>
          {
            mistake == true ?
              <div style={{color:"red", textDecoration:"underline"}}>Mistake</div>
              : null
          }
          <label>
            <h2>Login</h2>
          </label>
          <Input name="emailname" type="text" placeholder="Name or Email" required/>
          <Input name="password" type="password" placeholder="Password" required />
          <Button>Submit</Button>

        </form>
      </div>
    );
  }
}