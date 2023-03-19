import styles from "./styles/menu.module.sass";

interface IOption {
  id: number;
  symbol: string;
}
interface ICoords {
  x:number;
  y: number;
}
interface IMenu {
  options: IOption[];
  coords: ICoords;
}

export default function Menu({options, coords}: IMenu) {

  return (
    <div
      className={styles.menu}
      style={
        {top:(coords.y+20).toString()+"px", left:(coords.x+20).toString()+"px"}
      }>
      <button className={styles.element}>X</button>
      {
        options.map((option: IOption) => {
          return <button key={option.id} id={option.id.toString()} className={styles.element}>{option.symbol}</button>;
        })
      }
    </div>
  );
}