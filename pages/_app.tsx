import Layout from "@/modules/Layout/Layout";
import Header from "@/modules/Header/Header";
import "@/styles/global.sass";
import { Lato } from "next/font/google";
import { useEffect } from "react";

const lato = Lato({weight:["300", "400", "700", "900"], subsets:["latin"]});

export default function App({ Component, pageProps, user }: any) {
  
  useEffect(() => {
    const token: String | null = localStorage.getItem("token");
    fetch("http://localhost:3000/api/verify", {
      method: "POST",
      body: JSON.stringify({token: token, tokenCheck: token})
    })
      .then(res => res.json())
      .then(e => console.log(e));
  }, []);

  user;

  return (
    <Layout className={lato.className}>
      <Header/>
      <Component {...pageProps} />
    </Layout>
  );
}