import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import Link from "next/link";
import styles from "../styles/profile.module.sass";
import coffee from "public/coffee.svg";
import { FormEvent } from "react";
import axios from "axios";

export default function Profile() {


  const user = useSelector((state: any) => state).login;
  const dispatch = useDispatch();
  
  const [selectedImage, setSelectedImage] = useState<any>("");

  if(user === false) return (
    <>
      <div>You&apos;re not logged in.</div>
      <h1>You can <Link href="/login">log in</Link>, or <Link href="/register">register</Link>.</h1>
    </>
  );

  async function sub(e: FormEvent) {
    e.preventDefault();

    const form = new FormData();

    form.append("value", selectedImage);

    axios.post("/api/img", form);
  }

  return (
    <section className={styles.section}>
      {user.status === "BANNED" ? <h1>YOURE BANNED</h1> : null}
      <div className={styles.profileTop}>
        <div className={styles.avatar}>
          {user.avatar === "null" ? <Image width={32} height={32} src={coffee.src} alt="user avatar" /> : <Image width={128} height={128} src={user.avatar} alt="user avatar" />}
        </div>
        <div className="additional">
          <div className="name"><h1>{user.id}. {user.name}</h1></div>
          <div className="des">Its your profile, you can edit it and see additional information.</div>
        </div>
      </div>
      <form onSubmit={(e: FormEvent) => sub(e)} method="post">
        <h1>Profile information:</h1>
        <div className={styles.settings}>
          <div className={styles.inline}>
            <h3>Email: </h3>
            <Input name="email" value={user.email}/>
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
            <h3>Avatar: </h3>
            { user.avatar === "null" ?
              <Input
                name="avatar"
                type="file"
                onChange={({target}: any) => {
                  if(target.files[0]) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                  };
                }}
              /> : "avatar"
            }
            {
              selectedImage ? <Image src={selectedImage} alt="your img" width={50} height={50}/> : null
            }
          </div>
          <div className={styles.inline}>
            <h3>Roles: </h3>
            <Input disabled value={user.role ? user.role.join(" ") : "Empty"}/>
          </div>
        </div>
        <h1>Actions:</h1>
        <div className={styles.buttons}>
          <Button type="red" onClick={() => {localStorage.removeItem("token"); dispatch({type:"set", payload:false});}}>Sign out</Button>
          <Button>Save</Button>
        </div>
      </form>
    </section>
  );
}