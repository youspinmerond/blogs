import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Head from "next/head";

export default function Layout({children}:any) {
  const dispatch = useDispatch();

  function disp(payload:any) {
    dispatch({type: "set", payload: payload});
  };

  useEffect(() => {
    const token: String | null = localStorage.getItem("token");
    fetch("http://localhost:3000/api/verify", {
      method: "POST",
      body: JSON.stringify({token: token, tokenCheck: token})
    })
      .then(res => res.json())
      .then((e:any) => "message" in e ? null : disp(e));
  }, []);

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