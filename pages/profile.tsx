import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import Authorize from "@/modules/Authorize/Authorize";
import styles from "../styles/profile.module.sass";
import coffee from "public/coffee.svg";
import { FormEvent } from "react";
import axios from "axios";
import IUser from "@/types/user";

export default function Profile() {


  const user = useSelector(
    (state: {login: IUser} | boolean) =>
      typeof state !== "boolean" ? state.login : state
  );
  const dispatch = useDispatch();
  
  const [selectedImage, setSelectedImage] = useState<string>("");

  if(user === false) return <Authorize />;

  async function sub(e: FormEvent) {
    e.preventDefault();

    const form = new FormData();
    form.append("value", selectedImage);
    axios.post("/api/img", form);
  }

  if(typeof user === "boolean") return;
  return (
    <section className={styles.section}>
      {
        user.status === "BANNED" ?
          <h1>YOURE BANNED</h1>
          : null
      }
      <div className={styles.profileTop}>
        <div className={styles.avatar}>
          {
            user.avatar === "null" ?
              <Image
                width={32}
                height={32}
                src={coffee.src}
                alt="user avatar" />
              : 
              <Image
                width={128}
                height={128}
                src={user.avatar ? user.avatar : ""}
                alt="user avatar" />
          }
        </div>
        <div className="additional">
          <div className="name">
            <h1>
              {user.id}.{user.name}
            </h1>
          </div>
          <div className="des">
            Its your profile, you can edit it and see additional information.
          </div>
        </div>
      </div>
      <form onSubmit={(e: FormEvent) => sub(e)} method="post">
        <h1>Profile information:</h1>
        <div className={styles.settings}>
          <div className={styles.inline}>
            <h3>Email: </h3>
            <Input
              name="email"
              value={
                typeof user.email === "string" ? user.email : ""
              }/>
          </div>
          <div className={styles.inline}>
            <h3>Created at: </h3>
            <Input
              type="date"
              disabled
              value={
                user.createdAt ?
                  new Date(user.createdAt).toISOString().substring(0, 10)
                  : "0"
              }/>
          </div>
          <div className={styles.inline}>
            <h3>Reputation: </h3>
            <Input disabled value={user.rank.toString()}/>
          </div>
          <div className={styles.inline}>
            <h3>Avatar: </h3>
            { user.avatar === "null" ?
              <Input
                name="avatar"
                type="file"
                onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                  if(!target.files) return;
                  if(target.files[0]) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                  };
                }}
              /> : "avatar"
            }
            {
              selectedImage ?
                <Image
                  src={selectedImage}
                  alt="your img"
                  width={50}
                  height={50}/> : null
            }
          </div>
          <div className={styles.inline}>
            <h3>Roles: </h3>
            <Input disabled value={user.role ? user.role.join(" ") : "Empty"}/>
          </div>
        </div>
        <h1>Actions:</h1>
        <div className={styles.buttons}>
          <Button
            type="red"
            onClick={
              () => {
                dispatch({type:"set", payload:false});
                localStorage.removeItem("token");
                document.cookie =
                "token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
              }
            }>Sign out</Button>
          <Button typeButton="submit">Save</Button>
        </div>
      </form>
    </section>
  );
}