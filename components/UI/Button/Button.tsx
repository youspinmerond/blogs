import styles from "./styles/button.module.sass";

interface IButton {
  children: any;
  type?: "default" | "red";
  typeButton?: "button" | "submit";
  onClick?: any;
  disabled?: boolean;
}

export default function Button({children, type="default", typeButton="button", onClick, disabled}: IButton) {
  return (
    <button className={type === "red" ? styles.red : styles.default} type={typeButton} onClick={onClick} disabled={disabled}>{children}</button>
  );
}