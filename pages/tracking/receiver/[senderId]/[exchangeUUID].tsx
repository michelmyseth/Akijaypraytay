import React from "react";
import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../../util/mongodb";
import { Users, Exchange } from "../../../../data/types/users";
import { validate as uuidValidate } from "uuid";
import { ExchangeProps } from "../../../../data/types/props";
import Navbar from "../../../../components/Navbar";
import Container from "@material-ui/core/Container";

const ReceiverExchangeID: React.FC<ExchangeProps> = ({
  exchangeData,
  isReceiverIsLoaner,
  exchangeIndex,
  userId,
  isToken,
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
      <Navbar isConnect={isToken} />
      <br />
      <h1 className="text-center">TRACKING RECEIVER</h1>
      <br />
      <br />

      {isDataValid ? (
        <Container maxWidth="sm">
          <div className="card border-info mb-3" style={{ width: "18 em" }}>
            <div className="card-body ">
              <strong> Detail of exchange</strong> n°
              {userData._id}
            </div>
            <div className="card-footer bg-transparent border-info">
              <p className="card-text">
                {isLoaner ? (
                  <>
                    <strong>Loaner from :</strong> {userData.borrower}
                  </>
                ) : (
                  <>
                    <strong>Borrow from :</strong> {userData.loaner}
                  </>
                )}
              </p>
            </div>
            <div className="card-footer bg-transparent border-info">
              <div>
                <strong> Category : </strong>
                {userData.item.category}
              </div>
              <div>
                <strong> Objet : </strong>
                {userData.item.name}
              </div>
              <strong> Description : </strong>
              {userData.item.description}
            </div>

            <div className="card-footer bg-transparent border-info">
              <div>
                <strong>Creation date : </strong>
                {`${userData.creation_date}`}
              </div>{" "}
              <div>
                {" "}
                <strong> Return date :</strong> {`${userData.return_date}`}
              </div>
            </div>
            <div className="card-footer bg-transparent border-info">
              <p>
                {" "}
                <strong>Status :</strong> {`${currentStatus}`}
              </p>
            </div>
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
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
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
                </div>
                <br />
              </form>
            ) : (
              ""
            )}
          </div>
        </Container>
      ) : (
        "Nothing to display"
      )}
    </div>
  );
};

export default ReceiverExchangeID;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = context.req.cookies.token;
  let isToken = null;

  if (userToken === undefined) {
    isToken = false;
  } else {
    isToken = true;
  }
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
      isToken: isToken,
    },
  };
};
