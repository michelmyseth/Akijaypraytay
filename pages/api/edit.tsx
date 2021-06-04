import React from "react";
import { connectToDatabase, getDatabase } from "../../util/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongodb = await getDatabase();
  const userToken = request.cookies.token;
  // console.log(userToken);
  if (request.method === "POST") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    const userName = request.body.userName;

    // console.log(userName);
    mongodb
      .db()
      .collection("users")
      .updateOne(
        { "profile.token": `${userToken}` },
        {
          $set: {
            "profile.username": `${userName}`,
          },
        }
      );
    response.redirect("/profile");
    response.end();
  } else {
    response.statusCode = 405;
    response.end();
  }
};
