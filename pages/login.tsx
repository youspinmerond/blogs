import styles from "styles/login.module.sass";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import { useState } from "react";

interface IBody {
  name?: string,
  email?: string,
  password?: string
}

export default function Login() {

  const [mistake, setMistake] = useState<boolean>(false);

  async function sub(event: any ) {
    event.preventDefault();
    
    let body:IBody = {};
    
    event.target.emailname.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null
      ? body.name = event.target.emailname.value : body.email = event.target.emailname.value;

    body.password = event.target.password.value;
    

    let user = await fetch("http://localhost:3000/api/users/login", {
      method: "PUT",
      body: JSON.stringify(body)
    })
      .then(res => res.json());
    
    if(user.message) {
      setMistake(true);
    } else {
      localStorage.setItem("token", user.token);
      if(mistake === true) setMistake(false);
    }
      
    
    
  }

  return (
    <div className={styles.login}>
      <form className={styles.loginForm} action="" method="POST" onSubmit={(e): any => sub(e)}>
        {
          mistake == true ?
            <div style={{color:"red", textDecoration:"underline"}}>Mistake</div>
            : null
        }
        <Input name="emailname" type="text" placeholder="Name or Email" required/>
        <Input name="password" type="password" placeholder="Password" required />
        <Button>Submit</Button>

      </form>
    </div>
  );
}