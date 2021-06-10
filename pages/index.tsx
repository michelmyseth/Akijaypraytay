import React from "react";
import { connectToDatabase } from "../util/mongodb";
import Navbar from "../components/Navbar";

const Home: React.FC<{ isToken: boolean }> = ({ isToken }) => {
  return (
    <div>
      <Navbar isConnect={isToken} />
      <div id="homeBody" className="container-xl">
        <div className="row d-flex align-items-center">
          <div className="col-6">
            <h1 id="homePageTitle">NEVER FORGET THE ITEMS YOU LENT !</h1>
            <br />
            <br />
            <h4>
              This is a tool to remember objects lent to his friends. You can
              use it like a memo to keep in mind what you lent
            </h4>
            <br />
            <br />
            <br />
            <br />
            <div className="d-flex justify-content-center">
              {isToken ? (
                <a
                  id="Allbutton"
                  className="btn btn-lg"
                  href="api/login/"
                  role="button"
                >
                  My Dashboard
                </a>
              ) : (
                <a
                  id="Allbutton"
                  className="btn btn-lg"
                  href="api/login/"
                  role="button"
                >
                  TRY IT
                </a>
              )}
            </div>
          </div>
          <div id="colBody" className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
export async function getServerSideProps(context) {
  const userToken = context.req.cookies.token;
  let isToken = null;

  if (userToken === undefined) {
    isToken = false;
  } else {
    isToken = true;
  }

  const { client } = await connectToDatabase();
  const isConnected = await client.isConnected();
  return {
    props: { isConnected, isToken: isToken },
  };
}
