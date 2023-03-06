import Head from "next/head";

export default function Layout({children}:any) {
  return (
    <>
      <Head>
        <title>Blogs, IT</title>
      </Head>
      <div>
        {children}
      </div>
    </>
  );
}