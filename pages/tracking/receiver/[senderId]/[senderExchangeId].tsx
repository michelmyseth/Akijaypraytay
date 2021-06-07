import React from "react";
import { GetServerSideProps } from "next";
import { Users, Exchange } from "../../../../data/types/users";
import { Props } from "../../../../data/types/props";
import { checkingConnection } from "../../../../util/checkingConnection";

const ReceiverExchangeID: React.FC<Props> = ({ userData, exchangeId }) => {
  const [isExchangeIdValid, setIsExchangeIdValid] =
    React.useState<boolean>(undefined);
  const [isSenderIdValid, setIsSenderIdValid] =
    React.useState<boolean>(undefined);
  const [exchangeData, setExchangeData] = React.useState<Exchange>(undefined);
  const [isLoaner, setIsLoaner] = React.useState<boolean>(undefined);

  React.useEffect(() => {
    if (exchangeId - 1 < 0) {
      setIsExchangeIdValid(false);
    } else {
      //Add a find of user in DB
      if (userData.exchange.length >= exchangeId) {
        setIsExchangeIdValid(true);
        setExchangeData(userData.exchange[exchangeId - 1]);
        if (
          userData.profile.mail === userData.exchange[exchangeId - 1].borrower
        ) {
          setIsLoaner(true);
        } else {
          setIsLoaner(false);
        }
      }
    }
  }, []);

  return (
    <div>
      {/* isExchangeIdValid */}
      <h1>
        {isExchangeIdValid ? (
          <div>
            <h2>Detail of exchange n°{exchangeId}</h2>
            <h5>{isLoaner ? "(loaned)" : "(borrow)"}</h5>
          </div>
        ) : (
          "Exchange not found"
        )}
      </h1>

      {/* Detail */}
      {isExchangeIdValid ? (
        <ul>
          <h3>{`${exchangeData.item.name}`}</h3>

          <li>{`${exchangeData.item.description}`}</li>

          <li>{`${exchangeData.creation_date}`}</li>
        </ul>
      ) : (
        "Nothing to display"
      )}
    </div>
  );
};

export default ReceiverExchangeID;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = context.req.cookies.token;

  ////Checking if 'context.query.senderExchangeId' is a string, and a number when parseInt
  let exchangeId: number = 0;
  let senderId: number = 0;
  if (typeof context.query.senderExchangeId === "string") {
    exchangeId = parseInt(context.query.senderExchangeId);
    if (Number.isNaN(exchangeId)) {
      exchangeId = 0;
    }
  }
  if (typeof context.query.senderId === "string") {
    senderId = parseInt(context.query.senderId);
    if (Number.isNaN(exchangeId)) {
      senderId = 0;
    }
  }

  const checkConnectionValidity = await checkingConnection(
    userToken,
    exchangeId
  );
  // console.log("DB", checkConnectionValidity);

  return checkConnectionValidity;
};
