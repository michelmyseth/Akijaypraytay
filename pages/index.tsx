import React from "react";
import { Button } from "react-bootstrap";
import { connectToDatabase } from "../util/mongodb";
export default function Home() {
  return (
    <div>
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
              <a
                id="Allbutton"
                className="btn btn-lg"
                href="api/login/"
                role="button"
              >
                TRY IT !
              </a>
            </div>
          </div>

          <div id="colBody" className="col"></div>
        </div>
      </div>
      {/* <div className="container ml-2">
        <div className="row justify-content-center">
          <div className="col-6 ">
            <h1>Never forget the items you lent !</h1>
            <br />
            <br />
            <h4>
              Akijaypraytay is a solution to remember objects lent to his
              friends. You can use it like a memo to never forget what you lent
            </h4>
            <br />
            <br />
            <br />
            <br />
          </div>
          <div className="col-6">
            <img
              src="/img/homepage2.jpg"
              height="600"
              width="500"
              alt=""
              className="rounded"
            />
          </div>

          <br />
          <br />
        </div>
        <div id="homePageButton" className="container">
          <div className="d-grid col-6 mx-auto">
            <a
              id="Allbutton"
              className="btn btn-lg"
              href="api/login/"
              role="button"
            >
              Try it !
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
}
export async function getServerSideProps() {
  const { client } = await connectToDatabase();
  const isConnected = await client.isConnected();
  return {
    props: { isConnected },
  };
}
