## Using MongoDB

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. This example will show you how to connect to and use MongoDB as your backend for your Next.js app.

If you want to learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.
- `MONGODB_DB` - The name of the MongoDB database you want to use.
- `CONNECT_CLIENT_ID` - From authentication service provider @fewlines
- `CONNECT_CLIENT_SECRET` - From authentication service provider @fewlines
- `CONNECT_REDIRECT_URI` - From authentication service provider @fewlines, to be redirect on your site
- `SENDGRID_API_KEY` - The Api's key for sending email
- `SENDGRID_DOMAIN_URL` - Depending on environment, you'll need to give the beginning of your URL

### Run Next.js in development mode

```bash
yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` and `MONGODB_DB` environment variables.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.

## Dependencies

Authentication :
`yarn add @fewlines/connect-client`
`yarn add --dev cookie @types/cookie`

MongoDB :
`yarn add mongodb @types/mongodb`

Date-fns :
`yarn add date-fns`

Uuid :
`yarn add uuid`

Sendgrid/mail
`yarn add @sendgrid/mail`

Typescript :
`yarn add --dev typescript @types/react`
Renamme folder .js by .tsx

Bootstrap :
`yarn add bootstrap @types/react-bootstrap`

Material-ui :
`yarn add @material-ui/core`

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

Renamme folder .js by .tsx
source .env.local

yarn add react-bootstrap bootstrap@4.6.0

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.
