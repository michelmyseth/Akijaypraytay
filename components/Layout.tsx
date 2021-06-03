import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footerx from "./Footerx";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="min-vh-100 flex-column d-flex bodycss">
      <div className=" bg-secondary text-white">
        <Head>
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
          <title>Akijaypraytay</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="" />
        </Head>
        <Navbar />
        <br />
        <br />
        <br />

        <div className="h-100">{children}</div>
      </div>
      <footer className="mt-auto">
        <Footerx />
      </footer>
    </div>
  );
};

export default Layout;
