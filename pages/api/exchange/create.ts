import { NextApiRequest, NextApiResponse, Redirect } from "next";
import { getDatabase } from "../../../util/mongodb";
import { Exchange, Object } from "../../../data/types/users";
import { v4 as uuidv4 } from "uuid";
import sendgrid from "@sendgrid/mail";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const uuidNewValue = uuidv4();
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
      uuid: uuidNewValue,
      item: {
        name: request.body.name,
        description: request.body.description,
        category: request.body.category,
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
        category: request.body.category,
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

    //// @sendgrid/mail
    let userMailTo: string = "";
    let otherMailTo: string = "";
    if (request.body.loaner === userData.profile.mail) {
      userMailTo = request.body.loaner;
      otherMailTo = request.body.borrower;
    } else {
      otherMailTo = request.body.loaner;
      userMailTo = request.body.borrower;
    }
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    const SENDGRID_DOMAIN_URL = process.env.SENDGRID_DOMAIN_URL;

    //// SentMailToOther
    const msg = {
      to: otherMailTo,
      from: "akijaypraytay@outlook.com",
      subject: `Akijaypraytay : new exchange`,
      text: `${userData.profile.username} sets an exchange with you for this object : ${request.body.name}`,
      html: `${userData.profile.username} sets an exchange with you for this object : ${request.body.name} <button><a href=${SENDGRID_DOMAIN_URL}receiver/${userData._id}/${uuidNewValue}>Check it out now</a></button>`,
    };
    sendgrid
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

    response.redirect(
      `/tracking/sender/${userData.exchange[userData.exchange.length - 1]._id}`
    );
  }
};
