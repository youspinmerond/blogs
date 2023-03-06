import { useSelector } from "react-redux";
import styles from "../styles/profile.module.sass";
export default function Profile() {

  const user = useSelector((state:any) => state).login;

  return (
    <section className={styles.section}>
      <div>
        <h1>{user.name}</h1>
        <h2>on blogs from: {new Date(user.createdAt).toLocaleDateString()}</h2>
        <h2>reputation: {user.rank}</h2>
        <h2>Roles: {user.role.join(" ")}</h2>
      </div>
    </section>
  );
}