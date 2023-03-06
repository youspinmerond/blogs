import Link from "next/link";
import styles from "../styles/Home.module.sass";

interface IPost {
  id: number;
  title: string;
  body: string;
  rank: number;
  createdAt: Date;
  userId: number;
  status: "AVIABLE" | "BANNED";
}

export default function Home({posts}:any) {

  return (
    <div style={{fontFamily:"sans-serif, lato"}}>
      <section className={styles.section}>
        <h1>Newest posts</h1>
        <div className={styles.posts}>
          {
            posts.map((post:IPost) => (
              <Link className={styles.post} key={post.id} href={"http://localhost:3000/article/"+post.id}>
                <div className="top">
                  <h1>{post.title}</h1>
                </div>
                <div className="body">
                  {post.body.length <= 20 ? post.body : post.body.slice(0,50)+"..."}
                </div>
                <div className={styles.postBottom}> 
                  <span>
                    {post.rank},&nbsp;
                    {new Date(post.createdAt).toLocaleDateString()},&nbsp;
                    {new Date(post.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </Link>
            ))
          }
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await fetch("http://localhost:3000/api/posts/getNew", {method:"GET"})
    .then(res => res.json());

  return {
    props: {
      posts: posts
    }
  };
}