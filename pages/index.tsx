import { connectToDatabase } from "../util/mongodb";

export default function Home() {
  return (
    <div>
      <br />
      <br />
      <br />
      <div className="container ml-2">
        <h1>chips</h1>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
