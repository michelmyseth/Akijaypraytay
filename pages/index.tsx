import { connectToDatabase } from "../util/mongodb";
export default function Home() {
  return (
    <div className="">
      <div className="container ml-2">
        <h2>Don't forget the items you lent to your friends </h2>
        <button id="Allbutton" type="button" className="btn ">
          GO !
        </button>

        <br />
        <br />
      </div>
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
