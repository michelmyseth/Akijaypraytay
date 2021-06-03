import { connectToDatabase } from "../util/mongodb";
export default function Home() {
  return (
    <div className="">
      <div className="container ml-2">lorem3000</div>
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
