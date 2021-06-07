import React from "react";
import { GetServerSideProps } from "next";
import { Props } from "../../../data/types/props";
import { Exchange } from "../../../data/types/users";
import { checkingConnection } from "../../../util/checkingConnection";

const SenderExchangeId: React.FC<Props> = ({ userData, exchangeId }) => {
  const [isExchangeIdValid, setIsExchangeIdValid] =
    React.useState<boolean>(false);
  const [exchangeData, setExchangeData] = React.useState<Exchange>(undefined);
  const [isLoaner, setIsLoaner] = React.useState<boolean>(undefined);

  React.useEffect(() => {
    if (exchangeId - 1 < 0) {
      setIsExchangeIdValid(false);
    } else {
      if (userData.exchange.length >= exchangeId) {
        setIsExchangeIdValid(true);
        setExchangeData(userData.exchange[exchangeId - 1]);
        if (
          userData.profile.mail === userData.exchange[exchangeId - 1].loaner
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

export default SenderExchangeId;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = context.req.cookies.token;

  ////Checking if 'context.query.senderExchangeId' is a string, and a number when parseInt
  let exchangeId: number = 0;
  if (typeof context.params.senderExchangeId === "string") {
    exchangeId = parseInt(context.params.senderExchangeId);
    if (Number.isNaN(exchangeId)) {
      exchangeId = 0;
    }
  }

  const checkConnectionValidity = await checkingConnection(
    userToken,
    exchangeId
  );
  // console.log("DB", checkConnectionValidity);

  return checkConnectionValidity;
};
