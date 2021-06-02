import { connectToDatabase } from "../util/mongodb";

export default function Home() {
  return (
    <div>
      <br />
      <br />
      <br />
      <h1>chips</h1>
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
