import { NextApiRequest, NextApiResponse, Redirect } from "next";
import { getDatabase } from "../../../util/mongodb";
import { Exchange, Object } from "../../../data/types/users";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    // console.log(request.body);
    const mongodb = await getDatabase();
    const userData = await mongodb
      .db()
      .collection("users")
      .findOne({ "profile.token": `${request.cookies.token}` });

    const exchangeData: Exchange[] = userData.exchange;
    exchangeData.push({
      _id: parseInt(request.body._id),
      item: {
        name: request.body.name,
        description: request.body.description,
        picture: request.body.picture,
      },
      loaner: request.body.loaner,
      borrower: request.body.borrower,
      creation_date: new Date().toDateString(),
      return_date: request.body.returnDate,
      status: "Waiting",
    });

    const ownedItemsData: Object[] = userData.profile.ownedItems;
    ownedItemsData.push({
      name: request.body.name,
      description: request.body.description,
      picture: request.body.picture,
    });

    await mongodb
      .db()
      .collection("users")
      .updateOne(
        { "profile.token": `${request.cookies.token}` },
        {
          $set: {
            exchange: exchangeData,
            "profile.ownedItems": ownedItemsData,
          },
        }
      );
  }
};
