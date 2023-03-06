import { useState, FormEvent } from "react";
import styles from "./styles/input.module.sass";

export default function Input({ placeholder="", value="", required=false, type="text", name=""}) {

  const [valueInp, setValue] = useState<string>(value);

  return <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={valueInp}
    required={required}
    className={styles.input}
    onChange={(e): FormEvent => {
      setValue(e.target.value);
      return e;
    }}
  />;

}