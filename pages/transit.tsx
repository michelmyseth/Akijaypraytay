import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Navbar from "../components/Navbar";

const Continue: React.FC<{ isToken: boolean }> = ({ isToken }) => {
  React.useEffect(() => {
    setTimeout(() => {
      window.location.href = "/profile/";
    }, 3000);
  }, []);
  return (
    <>
      <Navbar isConnect={!isToken} />
      <div className="container-xl">
        <div className="row d-flex align-items">
          <div className="col-6">
            <img src="/img/25.png" width="800" height="600" />
          </div>
          <div className="col-6">
            <br />
            <br />
            <h2>Redirection</h2>
            <p>
              If you are not redirect within 3 seconds, please click on the
              "Continue" button below
            </p>
            <button className="btn btn-outline-dark border m-1">
              <Link href={`/dashboard/`}>Continue</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Continue;

export async function getServerSideProps(context) {
  const userToken = context.req.cookies.token;
  let isToken = null;

  if (userToken === undefined) {
    isToken = false;
  } else {
    isToken = true;
  }

  return {
    props: { isToken: isToken },
  };
}
