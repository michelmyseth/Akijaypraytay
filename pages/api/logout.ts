import { NextApiRequest, NextApiResponse, Redirect } from "next";
import { connectToDatabase, getDatabase } from "../../util/mongodb";
import cookie from "cookie";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongodb = await getDatabase();
  await mongodb
    .db()
    .collection("users")
    .updateOne(
      { "profile.token": `${request.cookies.token}` },
      {
        $set: {
          "profile.token": "",
        },
      }
    );

  response.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );
  response.redirect("/");
};
