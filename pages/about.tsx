import styles from "../styles/about.module.sass";

export default function About() {
  return (
    <section className={styles.section}>
      <h1>Blogs</h1>
      <br />
      <p>Blogs it&apos;s an simple MPA site, written on NextJS, TypeScript, and few another support techniques as SASS, ESLint.</p>
      <br />
      <p>My purpose: do simple, minimalistic and usable blog web-site,
        which you can start even on phone using Termux or anything other device.</p>
      <br />
      <p>It has API, you can get any information about Blogs from there.</p>
      <br />
      <p>
        <h3>What I did for just now:</h3>
        <ul className={styles.ul}>
          <li>
            <ul className={styles.ul}>
              Back-end
              <li>API</li>
              <li>Login, Register, all what you want.</li>
              <li>Used clear NextJS.</li>
            </ul>
          </li>
          <br />
          <li>
            <ul className={styles.ul}>
              Front-end
              <li>Index, about, profile, posts pages.</li>
              <li>Auth system, using localStorage.</li>
            </ul>
          </li>
          <br />
          <li>
            <ul className={styles.ul}>
              TODO
              <li>
                <ul className={styles.ul}>
                  Back-end
                  <li>Learn Nest, and write addition API, which can be used instead original API.</li>
                </ul>
              </li>
              <li>
                <ul className={styles.ul}>
                  Front-end
                  <li>Find design.</li>
                  <li>Finish pages.</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <br />
        <h3>For this moment</h3>
        <p>You can use API and write your own client.</p>
      </p>
    </section>
  );
}