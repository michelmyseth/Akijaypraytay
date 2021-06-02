import { NextApiRequest, NextApiResponse, Redirect } from "next";
import oauthClient from "../../../../util/OAuth2Client";
import { connectToDatabase, getDatabase } from "../../../../util/mongodb";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const tokens = await oauthClient.getTokensFromAuthorizationCode(
    `${request.query.code}`
  );
  // console.log(tokens);

  const userInfoResponse = await oauthClient.getUserInfo(tokens.access_token);
  //console.log(userInfoResponse);

  const { client } = await connectToDatabase();
  const isConnected = await client.isConnected();

  const mongodb = await getDatabase();
  const findingDB = await mongodb
    .db()
    .collection("users")
    // .findOne({ mail: `${userInfoResponse.email}` });
    .findOne({ mail: "toto" });
  console.log(findingDB);

  if (!findingDB) {
    console.log("Not in DB : going to create");
  } else {
    console.log("Is in DB : good to go");
  }

  // if (isConnected) {
  // }
};
