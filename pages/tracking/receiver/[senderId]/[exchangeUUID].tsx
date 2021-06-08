import React from "react";
import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../../util/mongodb";
import { Users, Exchange } from "../../../../data/types/users";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { ExchangeProps } from "../../../../data/types/props";

const ReceiverExchangeID: React.FC<ExchangeProps> = ({
  exchangeData,
  isReceiverIsLoaner,
}) => {
  const [userData, setUserData] = React.useState<Exchange>(null);
  const [isLoaner, setIsLoaner] = React.useState<boolean>(null);
  const [isDataValid, setIsDataValid] = React.useState<boolean>(null);

  React.useEffect(() => {
    if (exchangeData.length === 1) {
      setUserData(exchangeData[0]);
      setIsDataValid(true);
      setIsLoaner(isReceiverIsLoaner);
    } else if (exchangeData.length === 0) {
      setIsDataValid(false);
    } else {
      setIsDataValid(false);
      console.error("\nError : ");
    }
  }, []);

  return (
    <div>
      <h1>
        {isDataValid ? (
          <div>
            <h2>Detail of exchange n°{userData._id}</h2>
            <h5>
              {isLoaner
                ? `(loaned to ${userData.borrower})`
                : `(borrow from ${userData.loaner})`}
            </h5>
          </div>
        ) : (
          "Exchange not found"
        )}
      </h1>

      {isDataValid ? (
        <ul>
          <h3>{`${userData.item.name}`}</h3>

          <li>{`${userData.item.description}`}</li>

          <li>{`${userData.creation_date}`}</li>
        </ul>
      ) : (
        "Nothing to display"
      )}
    </div>
  );
};

export default ReceiverExchangeID;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const senderIdParam = new ObjectId(context.params.senderId.toString());
  const findingReceiverExchange: Exchange[] = [];
  let isReceiverIsLoaner: boolean = null;
  let userExchanges: Exchange[];

  if (uuidValidate(context.params.exchangeUUID)) {
    const senderUUIDParam = context.params.exchangeUUID;
    const mongodb = await getDatabase();
    const findingDB: Users = await mongodb
      .db()
      .collection("users")
      .findOne({ _id: senderIdParam });

    if (!findingDB) {
      console.error("user._Id is not in DB");
    } else {
      userExchanges = findingDB.exchange;

      userExchanges.filter((indexValue: Exchange) => {
        if (indexValue.uuid === senderUUIDParam) {
          if (indexValue.loaner === findingDB.profile.mail) {
            isReceiverIsLoaner = false;
          } else {
            isReceiverIsLoaner = true;
          }
          return findingReceiverExchange.push(indexValue);
        }
      });
    }
  }

  return {
    props: {
      exchangeData: findingReceiverExchange,
      isReceiverIsLoaner: isReceiverIsLoaner,
    },
  };
};
