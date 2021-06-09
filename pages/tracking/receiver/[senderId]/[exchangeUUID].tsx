import React from "react";
import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../../util/mongodb";
import { Users, Exchange } from "../../../../data/types/users";
import { validate as uuidValidate } from "uuid";
import { ExchangeProps } from "../../../../data/types/props";

const ReceiverExchangeID: React.FC<ExchangeProps> = ({
  exchangeData,
  isReceiverIsLoaner,
  exchangeIndex,
  userId,
}) => {
  const [userData, setUserData] = React.useState<Exchange>(null);
  const [isLoaner, setIsLoaner] = React.useState<boolean>(null);
  const [isDataValid, setIsDataValid] = React.useState<boolean>(null);
  const [userID, setUserID] = React.useState<string>();
  const [currentStatus, setCurrentStatus] = React.useState<string>();

  React.useEffect(() => {
    if (exchangeData.length === 1) {
      setUserData(exchangeData[0]);
      setIsDataValid(true);
      setIsLoaner(isReceiverIsLoaner);
      setUserID(userId.toString());
      setCurrentStatus(exchangeData[0].status);
    } else if (exchangeData.length === 0) {
      setIsDataValid(false);
    } else {
      setIsDataValid(false);
      console.error("\nError : ");
    }
  }, []);

  return (
    <div>
      {isDataValid ? (
        <>
          <ul>
            <h1>
              <>
                <h2>Detail of exchange n°{userData._id}</h2>
                <h5>
                  {isLoaner
                    ? `(loaned to ${userData.borrower})`
                    : `(borrow from ${userData.loaner})`}
                </h5>
              </>
            </h1>

            <h3>{`${userData.item.name}`}</h3>
            {`${userData.item.description}`}
            <div>Creation date : {`${userData.creation_date}`}</div>
            <div>Return date : {`${userData.return_date}`}</div>
            <br />
            {/* WAITING STATUS */}
            <h5>{currentStatus}</h5>
            {currentStatus === "Waiting" ? (
              <form
                className="container-fluid"
                method="POST"
                action={`/api/exchange/changingStatus/`}
              >
                <input
                  type="hidden"
                  name="exchangeIndex"
                  value={exchangeIndex}
                />
                <input type="hidden" name="from" value="borrower" />
                <input type="hidden" name="userId" value={userID} />
                <button
                  className="btn btn-light text-dark border m-1"
                  type="submit"
                  name="status"
                  value="Pending"
                >
                  Confirm
                </button>
                <button
                  className="btn btn-dark text-light border m-1"
                  type="submit"
                  name="status"
                  value="Abort"
                >
                  Refuse
                </button>
              </form>
            ) : (
              ""
            )}
          </ul>
        </>
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
  let exchangeIndex: number = null;
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

      userExchanges.filter((indexValue: Exchange, index: number) => {
        if (indexValue.uuid === senderUUIDParam) {
          exchangeIndex = index;
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
      exchangeIndex: exchangeIndex,
      userId: context.params.senderId,
    },
  };
};
