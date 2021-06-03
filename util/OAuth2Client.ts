import OAuth2Client, {
  OAuth2ClientConstructor,
} from "@fewlines/connect-client";

const oauthClientConstructorProps: OAuth2ClientConstructor = {
  openIDConfigurationURL:
    "https://fewlines.connect.prod.fewlines.tech/.well-known/openid-configuration",
  clientID: `${process.env.CONNECT_CLIENT_ID}`,
  clientSecret: `${process.env.CONNECT_CLIENT_SECRET}`,
  redirectURI: `${process.env.CONNECT_REDIRECT_URI}`,
  audience: "wdb2g2",
  scopes: ["openid", "email"],
};

const oauthClient = new OAuth2Client(oauthClientConstructorProps);

export default oauthClient;
