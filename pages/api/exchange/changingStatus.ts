import { NextApiRequest, NextApiResponse, Redirect } from "next";
import { Users, Exchange } from "../../../data/types/users";
import { getDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";
import sendgrid from "@sendgrid/mail";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const userId: ObjectId = new ObjectId(request.body.userId.toString());
  const status: string = request.body.status;
  const isLoaner: string = request.body.from;

  const mongodb = await getDatabase();
  const findingDB: Users = await mongodb
    .db()
    .collection("users")
    .findOne({ _id: userId });

  let newExchangesArray: Exchange[] = [];
  let exchangeUUID: string = "";
  let loanerAdressMail: string = "";
  let borrowerAdressMail: string = "";
  let exchangePreviousStatus: string = "";
  let exchangeNewStatus: string = "";
  let exchangeItem: string = "";
  let exchangeIndex: number = parseInt(request.body.exchangeIndex);

  findingDB.exchange.filter((element: Exchange, index: number) => {
    if (index === exchangeIndex) {
      const newElement: Exchange = {
        _id: element._id,
        uuid: element.uuid,
        item: element.item,
        loaner: element.loaner,
        borrower: element.borrower,
        creation_date: element.creation_date,
        return_date: element.return_date,
        status: status,
      };
      exchangeUUID = element.uuid;
      loanerAdressMail = element.loaner;
      borrowerAdressMail = element.borrower;
      exchangePreviousStatus = element.status;
      exchangeNewStatus = status;
      exchangeItem = element.item.name;
      newExchangesArray.push(newElement);
    } else {
      newExchangesArray.push(element);
    }
  });

  await mongodb
    .db()
    .collection("users")
    .updateOne(
      { _id: userId },
      {
        $set: {
          exchange: newExchangesArray,
        },
      }
    );

  //// @sendgrid/mail
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  const SENDGRID_DOMAIN_URL = process.env.SENDGRID_DOMAIN_URL;

  if (isLoaner === "loaner") {
    //// SentMailToBorrower
    const borrowerMsg = {
      to: `${borrowerAdressMail}`,
      from: "akijaypraytay-tracking@outlook.com",
      subject: `Akijaypraytay : update of your exchange`,
      text: `Your borrowed object has just changed status`,
      html: `Your borrowed object (${exchangeItem}) has just changed status : <strong>${exchangePreviousStatus}</strong> to <strong>${exchangeNewStatus}</strong> <p><button><a href=${SENDGRID_DOMAIN_URL}receiver/${userId}/${exchangeUUID}>Check it out now</a></button></p>`,
    };
    sendgrid
      .send(borrowerMsg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    setTimeout(() => {
      console.log("Proceed Timeout for loaner");
    }, 1000);
    response.redirect(`/tracking/sender/${exchangeIndex + 1}/`);
  } else {
    //// SentMailToLoaner
    const loanerMsg = {
      to: `${loanerAdressMail}`,
      from: "akijaypraytay-tracking@outlook.com",
      subject: `Akijaypraytay : update of your exchange`,
      text: `Your borrowed object has just changed status`,
      html: `Your loaned object (${exchangeItem}) has just changed status : <strong>${exchangePreviousStatus}</strong> to <strong>${exchangeNewStatus}</strong> <p><button><a href=${SENDGRID_DOMAIN_URL}sender/${exchangeIndex}>Check it out now</a></button></p>`,
    };
    sendgrid
      .send(loanerMsg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    setTimeout(() => {
      console.log("Proceed Timeout for borrower");
    }, 1000);
    response.redirect(`/tracking/receiver/${userId}/${exchangeUUID}/`);
  }
};
