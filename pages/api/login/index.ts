import { NextApiRequest, NextApiResponse, Redirect } from "next";
import oauthClient from "../../../util/OAuth2Client";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const authURL = await oauthClient.getAuthorizationURL();
  response.redirect(`${authURL}`);
};
