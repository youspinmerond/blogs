import styles from "../styles/about.module.sass";

export default function About() {
  return (
    <section className={styles.section}>
      <h1>Blogs</h1>
      <br />
      <p>
        Blogs it&apos;s a simple MPA site, written on NextJS, TypeScript,
        and few another support techniques as SASS, ESLint.
      </p>
      <br />
      <p>
        My purpose: do simple, minimalistic and usable blog web-site,
        which you can start even on phone using Termux or anything other device.
      </p>
      <br />
      <p>It has API, you can get any information about Blogs from there.</p>
      <br />
      <div>
        <h3>What I did for just now:</h3>
        <ul className={styles.ul}>
          <li>
            <ul >
              Back-end
              <li>API</li>
              <li>Login, Register, all what you want.</li>
              <li>Used clear NextJS.</li>
            </ul>
          </li>
          <br />
          <li>
            <ul >
              Front-end
              <li>Index, about, profile, posts pages.</li>
              <li>Auth system, using localStorage.</li>
            </ul>
          </li>
          <br />
          <li>
            <ul >
              TODO
              <li>
                <ul >
                  Back-end
                  <li>Learn Nest, and write addition API, which can be used
                    instead original API.</li>
                  <li>Rewrite on normally REST :facepalm:</li>
                </ul>
              </li>
              <li>
                <ul >
                  Front-end
                  <s>
                    <li>Find design.</li>
                    <li>Finish pages.</li>
                  </s>
                  <li>Make &ldquo;create article&rdquo; beauty</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <br />
        <h3>For this moment</h3>
        <p>You can use API and write your own client.</p>
      </div>
      <div>
        <h2>Edits story:</h2>
        <ul className={styles.ul}>
          <li>
            <ul>
              21 March
              <li>Parser for text, which works wrong.</li>
              <li>Added todos.</li>
              <li>Started rewriting architecture of project to MVC.</li>
            </ul>
            <br />
            <ul>
              19 March
              <li>Voting system for posts.</li>
            </ul>
            <br />
            <ul>
              8 March
              <li>Added create article page.</li>
              <li>Few features.</li>
              <li>Profile page edited.</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}