import React from "react";
import { connectToDatabase } from "../../util/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();
  if (request.method === "POST") {
    const username = {
      username: request.body.username,
    };

    db.collection("users").insertOne(username);
    response.redirect("/profile");
    response.end();
  } else {
    response.statusCode = 405;
    response.end();
  }
};
