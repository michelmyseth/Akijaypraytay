import { NextApiRequest, NextApiResponse, Redirect } from "next";
import oauthClient from "../../../../util/OAuth2Client";
import { connectToDatabase, getDatabase } from "../../../../util/mongodb";
import cookie from "cookie";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const tokens = await oauthClient.getTokensFromAuthorizationCode(
    `${request.query.code}`
  );
  // console.log("####\n ACCESS_TOKEN", tokens.access_token);

  const userInfoResponse = await oauthClient.getUserInfo(tokens.access_token);
  // console.log("####\n userMail", userInfoResponse.email);

  const { client } = await connectToDatabase();
  //const isConnected = await client.isConnected();

  const mongodb = await getDatabase();
  const findingDB = await mongodb
    .db()
    .collection("users")
    .findOne({ "profile.mail": `${userInfoResponse.email}` });
  // console.log("####\n First DB check", findingDB);

  if (!findingDB) {
    // console.log("Not in DB : going to create a new user");
    // response.redirect("/history/");
    await mongodb
      .db()
      .collection("users")
      .insertOne({
        profile: {
          username: `${userInfoResponse.email}`,
          mail: `${userInfoResponse.email}`,
          contacts: [""],
          ownedItems: [],
          token: "",
        },
        exchange: [],
      });
  }
  // console.log("Is in DB : good to go");

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
    // console.log(
    //   "\n #### token is already here",
    //   findingDBPostUpdate.profile.token
    // );
    response.setHeader(
      "Set-Cookie",
      cookie.serialize("token", tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );

    response.redirect("/transit/");
  } else {
    // console.log(
    //   "\n #### token is empty, need to relog",
    //   findingDB.profile.token
    // );
    response.redirect("/api/login/");
  }
};
