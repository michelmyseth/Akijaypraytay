import { NextApiRequest, NextApiResponse, Redirect } from "next";
import { getDatabase } from "../../../util/mongodb";
import { Exchange, Object } from "../../../data/types/users";
import { v4 as uuidv4 } from "uuid";

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
      uuid: uuidv4(),
      item: {
        name: request.body.name,
        description: request.body.description,
        picture: request.body.picture,
      },
      loaner: request.body.loaner,
      borrower: request.body.borrower,
      creation_date: new Date().toISOString().split("T")[0],
      return_date: request.body.returnDate,
      status: "Waiting",
    });

    const ownedItemsData: Object[] = userData.profile.ownedItems;

    const newContact: string[] = userData.profile.contacts;

    const isInContact: string[] = [];

    if (request.body.loaner === userData.profile.mail) {
      newContact.filter((contact: string) => {
        if (contact === request.body.borrower) {
          return isInContact.push(request.body.borrower);
        }
      });

      if (isInContact.length === 0) {
        newContact.push(request.body.borrower);
      }

      ownedItemsData.push({
        name: request.body.name,
        description: request.body.description,
        picture: request.body.picture,
      });
    } else if (request.body.borrower === userData.profile.mail) {
      newContact.filter((contact: string) => {
        if (contact === request.body.loaner) {
          return isInContact.push(request.body.loaner);
        }
      });

      if (isInContact.length === 0) {
        newContact.push(request.body.loaner);
      }
    }

    await mongodb
      .db()
      .collection("users")
      .updateOne(
        { "profile.token": `${request.cookies.token}` },
        {
          $set: {
            exchange: exchangeData,
            "profile.ownedItems": ownedItemsData,
            "profile.contacts": newContact,
          },
        }
      );

    response.redirect(
      `/tracking/sender/${userData.exchange[userData.exchange.length - 1]._id}`
    );
  }
};
