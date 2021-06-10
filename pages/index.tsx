import React from "react";
import { connectToDatabase } from "../util/mongodb";
import Navbar from "../components/Navbar";

// export default function Home() {
const Home: React.FC<{ isToken: boolean }> = ({ isToken }) => {
  return (
    <div className="">
      <Navbar isConnect={isToken} />
      <div className="container ml-2">
        <h2>Don't forget the items you lent to your friends</h2>
        <button id="Allbutton" type="button" className="btn ">
          GO !
        </button>

        <br />
        <br />
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
