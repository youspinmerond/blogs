import Image from "next/image";
import Link from "next/link";
import coffee from "public/coffee.svg";
import styles from "./navigation.module.sass";

export default function Navigation() {
  return (
    <nav>
      <div className={styles.nav}>
        <Link href="/" className="home">Home</Link>
        <Link href="/about" className="about">About</Link>
        <Link href="#" className="search">Search</Link>
        <Link href="#" className="login">Sign in</Link>
        <Link href="#" className="register">Sign up</Link>
        <Link href="#" className={styles.support}>
          <Image src={coffee.src} alt="Coffee" width={16} height={16}/>
          <span>Buy Us A Coffe</span>
        </Link>
      </div>
      <button className={styles.navPhone}>
          Nav
      </button>
    </nav>
  );
}