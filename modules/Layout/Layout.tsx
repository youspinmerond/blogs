import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Head from "next/head";

export default function Layout({children}:any) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.login);

  function disp(payload:any) {
    dispatch({type: "set", payload: payload});
  };

  useEffect(() => {
    const token: String | null = localStorage.getItem("token");
    if(!token) return;
    fetch("http://localhost:3000/api/verify", {
      method: "POST",
      body: JSON.stringify({token: token, tokenCheck: token})
    })
      .then(res => res.json())
      .then((e:any) => "message" in e ? null : disp(e.result))
      .catch(() => {});
  }, [user]);

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