import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Head from "next/head";
import Footerx from "./Footerx";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="min-vh-100 flex-column d-flex bodycss">
      <div className="text-black">
        <Head>
          <title>Akijaypraytay</title>
          <meta name="description" content="Generated by create next app" />

          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
            crossOrigin="anonymous"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          ></link>
        </Head>
        <br />
        <br />
        <br />

        <div className="h-100">{children}</div>
      </div>
      <footer className="mt-auto">
        <Footerx />
      </footer>
      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
        integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"
        integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
};
export default Layout;
