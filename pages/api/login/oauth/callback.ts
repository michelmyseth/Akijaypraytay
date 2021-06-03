import { NextApiRequest, NextApiResponse, Redirect } from "next";
import oauthClient from "../../../../util/OAuth2Client";
import { connectToDatabase, getDatabase } from "../../../../util/mongodb";
import cookie from "cookie";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const tokens = await oauthClient.getTokensFromAuthorizationCode(
    `${request.query.code}`
  );
  // console.log(tokens);

  const userInfoResponse = await oauthClient.getUserInfo(tokens.access_token);
  //console.log(userInfoResponse);

  const { client } = await connectToDatabase();
  //const isConnected = await client.isConnected();

  const mongodb = await getDatabase();
  const findingDB = await mongodb
    .db()
    .collection("users")
    .findOne({ "profile.mail": `${userInfoResponse.email}` });
  // .findOne({ "profile.mail": "toto@aol.com" });
  // console.log(findingDB);

  if (!findingDB) {
    console.log("Not in DB : going to create");
  } else {
    console.log("Is in DB : good to go");

    await mongodb
      .db()
      .collection("users")
      .updateOne(
        { "profile.mail": `${userInfoResponse.email}` },
        {
          $set: {
            "profile.token": `${tokens.access_token}`,
          },
        }
      );

    const findingDBPostUpdate = await mongodb
      .db()
      .collection("users")
      .findOne({ "profile.mail": `${userInfoResponse.email}` });

    if (findingDBPostUpdate.profile.token != "") {
      console.log("\n #### token is already here", findingDB.profile.token);
      response.setHeader(
        "Set-Cookie",
        // cookie.serialize("token", tokens.access_token, {
        cookie.serialize("token", "DummyTokenValue", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );

      response.redirect("/dashboard/");
    } else {
      console.log("\n #### token is empty", findingDB.profile.token);
    }
  }
};
