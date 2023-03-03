import Layout from "@/modules/Layout/Layout";
import "@/styles/global.sass";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";

const lato = Lato({weight:["300", "400", "700", "900"], subsets:["latin"]});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout className={lato.className}>
      <Component {...pageProps} />
    </Layout>
  );
}
