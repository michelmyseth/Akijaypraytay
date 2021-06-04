import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Layout from "../components/Layout";
import "../public/styles/global.css";
import datefns from "date-fns";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
