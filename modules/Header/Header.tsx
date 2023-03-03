import Navigation from "./components/Navigation/Navigation";
import styles from "./styles/header.module.sass";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Blogs
        <sub className={styles.little}>IT</sub>
      </div>
      <Navigation />
    </header>
  );
}