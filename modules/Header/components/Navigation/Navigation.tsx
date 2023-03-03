import Image from "next/image";
import coffee from "public/coffee.svg";
import styles from "./navigation.module.sass";

export default function Navigation() {
  return (
    <nav>
      <div className={styles.nav}>
        <button className="home">Home</button>
        <button className="about">About</button>
        <button className="search">Search</button>
        <button className="search">Sign in</button>
        <button className="search">Sign up</button>
        <button className={styles.support}>
          <Image src={coffee.src} alt="Coffee" width={16} height={16}/>
          <span>Support</span>
        </button>
      </div>
      <button className={styles.navPhone}>
          Nav
      </button>
    </nav>
  );
}