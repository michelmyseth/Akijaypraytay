import React from "react";
import Navbar from "../components/Navbar";
import NotFound from "../components/NotFound";

const PageNotFound: React.FC<{ isToken: boolean }> = ({ isToken }) => {
  return (
    <div className="">
      <Navbar isConnect={isToken} />
      <NotFound isConnect={isToken} />
    </div>
  );
};
export default PageNotFound;

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
