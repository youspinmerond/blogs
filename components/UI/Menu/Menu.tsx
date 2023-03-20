import { addElement } from "@/helpers/textAdding";
import styles from "./styles/menu.module.sass";

interface IOption {
  id: number;
  symbol: string;
  value: string;
}
interface ICoords {
  x:number;
  y: number;
}
interface IMenu {
  options: IOption[];
  coords: ICoords;
  editor: any;
  fieldState: any;
}

export default function Menu({options, coords, editor, fieldState}: IMenu) {

  return (
    <div
      className={styles.menu}
      style={
        {top:(coords.y+20).toString()+"px", left:(coords.x+20).toString()+"px"}
      }>
      <button type="button" className={styles.element} onClick={() => {fieldState(null);}}>X</button>
      {
        options.map((option: IOption) => {
          return <button
            type="button"
            key={option.id}
            id={option.id.toString()}
            onClick={() => addElement(editor, option.value)}
            className={styles.element}>
            {option.symbol}
          </button>;
        })
      }
    </div>
  );
}