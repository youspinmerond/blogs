import styles from "./styles/button.module.sass";

export default function Button({children, type="default", onClick}: any) {
  return (
    <button className={type === "red" ? styles.red : styles.default} onClick={onClick}>{children}</button>
  );
}