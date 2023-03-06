import styles from "./styles/button.module.sass";

export default function Button({children}: any) {
  return (
    <button className={styles.button}>{children}</button>
  );
}