import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import Link from "next/link";
import styles from "../styles/profile.module.sass";
import coffee from "public/coffee.svg";

export default function Profile() {


  const user = useSelector((state: any) => state).login;
  const dispatch = useDispatch();

  console.log(user);

  if(user === false) return (
    <>
      <div>You&apos;re not logged in.</div>
      <h1>You can <Link href="/login">log in</Link>, or <Link href="/register">register</Link>.</h1>
    </>
  );

  return (
    <section className={styles.section}>
      {user.status === "BANNED" ? <div>YOURE BANNED</div> : null}
      <div className={styles.profileTop}>
        <div className={styles.avatar}>
          {user.avatar === "null" ? <Image width={32} height={32} src={coffee.src} alt="user avatar" /> : <Image width={128} height={128} src={user.avatar} alt="user avatar" />}
        </div>
        <div className="additional">
          <div className="name"><h1>{user.id}. {user.name}</h1></div>
          <div className="des">Its your profile, you can edit it and see additional information.</div>
        </div>
      </div>
      <div className={styles.settings}>
        <div className={styles.inline}>
          <h3>Email: </h3>
          <Input value={user.email}/>
        </div>
        <div className={styles.inline}>
          <h3>Created at: </h3>
          <Input type="date" disabled value={user.createdAt ? new Date(user.createdAt).toISOString().substring(0, 10) : "0"}/>
        </div>
        <div className={styles.inline}>
          <h3>Reputation: </h3>
          <Input disabled value={user.rank}/>
        </div>
        <div className={styles.inline}>
          <h3>Roles: </h3>
          <Input disabled value={user.role ? user.role.join(" ") : "Empty"}/>
        </div>
      </div>
      <div className={styles.button}>
        <Button type="red" onClick={() => {localStorage.removeItem("token"); dispatch({type:"set", payload:false});}}>Sign out</Button>
        <Button>Save</Button>
      </div>
    </section>
  );
}