import { getDatabase } from "./mongodb";
import { Users, Exchange } from "../data/types/users";

export const changingStatus = async (
  exchange: Exchange[],
  exchangeIndex: number,
  isReceiverIsLoaner: boolean,
  status: string
) => {
  console.log("into function");
  console.log(
    "exchange : ",
    exchange,
    " exchangeIndex : ",
    exchangeIndex,
    " isReceiverLoaner : ",
    isReceiverIsLoaner,
    " status : ",
    status
  );

  // const mongodb = await getDatabase();
  // const findingDB: Users = await mongodb
  //   .db()
  //   .collection("users")
  //   .findOne({ "profile.mail": "grosboillotflo@aol.com" });

  // console.log(findingDB);

  // if (status !== "undefined") {
  //   const findingUser = await mongodb
  //     .db()
  //     .collection("users")
  //     .findOne({ "profile.mail": "grosboillotflo@aol.com" });
  //   console.log(findingUser);
  // }

  // await mongodb
  //   .db()
  //   .collection("users")
  //   .updateOne(
  //     { "": `${request.cookies.token}` },
  //     {
  //       $set: {
  //         exchange: exchangeData,
  //         "profile.ownedItems": ownedItemsData,
  //         "profile.contacts": newContact,
  //       },
  //     }
  //   );
  return true;
};
