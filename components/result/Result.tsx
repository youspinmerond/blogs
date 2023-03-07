import styles from "./styles/result.module.sass";

interface IResult {
  name: string;
  type: string;
  createdAt: string;
}

export default function Result({name, type, createdAt}: IResult) {
  return (
    <div className={styles.result}>
      <div className="top">{name}</div>
      <div className={styles.bottom}>{type}, {createdAt}</div>
    </div>
  );
}