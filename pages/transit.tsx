import Link from "next/link";

const Continue: React.FC = () => {
  return (
    <>
      <h1>Welcome back</h1>
      <button className="btn btn-outline-dark border m-1">
        <Link href={`/dashboard/`}>Continue</Link>
      </button>
    </>
  );
};

export default Continue;
