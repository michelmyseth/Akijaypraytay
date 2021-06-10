import Link from "next/link";
import { GetServerSideProps } from "next";
import Navbar from "../components/Navbar";

const Continue: React.FC<{ isToken: boolean }> = ({ isToken }) => {
  return (
    <>
      <Navbar isConnect={!isToken} />
      <h1>Welcome back</h1>
      <button className="btn btn-outline-dark border m-1">
        <Link href={`/dashboard/`}>Continue</Link>
      </button>
      <button className="btn btn-outline-dark border m-1">
        <Link href={`/profile/edit/`}>Edit Profile</Link>
      </button>
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
