import React from "react";
import { connectToDatabase } from "../../util/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  // const { db } = await connectToDatabase();
  // const profilToken = request.cookies.token;
  // console.log(profilToken);
  // if (request.method === "POST") {
  //   response.statusCode = 200;
  //   response.setHeader("Content-Type", "application/json");
  //   const userName = {
  //     userName: request.body.userName,
  //   };
  //   console.log(userName);
  //   db.collection("users").updateOne(
  //     // { profil.token : profilToken},
  //     { $set: userName }
  //   );
  //   response.redirect("/profile");
  //   response.end();
  // } else {
  //   response.statusCode = 405;
  //   response.end();
  // }
};
