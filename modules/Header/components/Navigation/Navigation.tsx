import Image from "next/image";
import Link from "next/link";
import coffee from "public/coffee.svg";
import { useSelector } from "react-redux";
import styles from "./navigation.module.sass";

export default function Navigation() {
  const user = useSelector((state:any) => state).login;
  
  return (
    <nav>
      <div className={styles.nav}>
        <Link href="/" className="home">Home</Link>
        <Link href="/about" className="about">About</Link>
        <Link href="/search" className="search">Search</Link>
        {
          user ? <Link href="/profile">{user.name}</Link>
            : (
              <>
                <Link href="/login" className="login">Sign in</Link>
                <Link href="/register" className="register">Sign up</Link>
              </>
            )
        }
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