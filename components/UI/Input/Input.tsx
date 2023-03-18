import { useState, FormEvent } from "react";
import styles from "./styles/input.module.sass";

interface I {
  placeholder?: string;
  value?: string;
  required?: boolean;
  type?: string;
  name?: string;
  disabled?: boolean;
  accept?: any;
  onChange?: undefined | Function;
}

export default function Input(
  {
    placeholder="",
    value="",
    required=false,
    type="text",
    name="",
    disabled=false,
    accept=undefined,
    onChange=undefined
  }: I) {

  const [valueInp, setValue] = useState<string>(value);

  return <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={valueInp}
    required={required}
    className={styles.input}
    disabled={disabled}
    accept={accept}
    style={{width:"12rem"}}
    onChange={(e): FormEvent => {
      onChange ? onChange(e) : null;
      setValue(e.target.value);
      return e;
    }}
  />;

}