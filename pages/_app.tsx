import Layout from "@/modules/Layout/Layout";
import Header from "@/modules/Header/Header";
import "@/styles/global.sass";
import { Lato } from "next/font/google";
import store from "../store/main";
import { Provider } from "react-redux";

const lato = Lato({weight:["300", "400", "700", "900"], subsets:["latin"]});

export default function App({ Component, pageProps, user }: any) {

  user;

  return (
    <Provider store={store}>
      <Layout className={lato.className}>
        <Header/>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}