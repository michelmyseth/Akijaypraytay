import React from "react";
import { GetServerSideProps } from "next";
import { Props } from "../../../data/types/props";
import { Exchange } from "../../../data/types/users";
import { checkingConnection } from "../../../util/checkingConnection";
import { isValid, isAfter } from "date-fns";
import Navbar from "../../../components/Navbar";

const SenderExchangeId: React.FC<Props> = ({
  userData,
  exchangeId,
  isToken,
}) => {
  const today: string = new Date().toISOString().split("T")[0];
  const [isDateValid, setIsDateValid] = React.useState<boolean>(false);
  const [isExchangeIdValid, setIsExchangeIdValid] =
    React.useState<boolean>(false);
  const [exchangeData, setExchangeData] = React.useState<Exchange>(undefined);
  const [isLoaner, setIsLoaner] = React.useState<boolean>(undefined);
  const [currentStatus, setCurrentStatus] = React.useState<string>();

  React.useEffect(() => {
    if (exchangeId - 1 < 0) {
      setIsExchangeIdValid(false);
    } else {
      if (userData.exchange.length >= exchangeId) {
        setIsExchangeIdValid(true);
        setExchangeData(userData.exchange[exchangeId - 1]);
        setCurrentStatus(userData.exchange[exchangeId - 1].status);
        if (
          userData.profile.mail === userData.exchange[exchangeId - 1].loaner
        ) {
          setIsLoaner(true);
        } else {
          setIsLoaner(false);
        }
        if (
          typeof userData.exchange[exchangeId - 1].return_date !== "undefined"
        ) {
          if (
            isAfter(
              new Date(today),
              new Date(userData.exchange[exchangeId - 1].return_date)
            )
          ) {
            setIsDateValid(
              isValid(new Date(userData.exchange[exchangeId - 1].return_date))
            );
          } else {
            setIsDateValid(false);
          }
        }
      }
    }
  }, []);

  return (
    <div>
      <Navbar isConnect={isToken} />
      {isExchangeIdValid ? (
        <>
          <ul>
            <h1>
              <>
                <h2>Detail of exchange n°{exchangeId}</h2>
                <h5>{isLoaner ? "(loaned)" : "(borrow)"}</h5>
              </>
            </h1>
            <br />
            <h3>{`${exchangeData.item.name}`}</h3>
            {`${exchangeData.item.description}`}
            <div>Creation date : {`${exchangeData.creation_date}`}</div>
            <div>Return date : {`${exchangeData.return_date}`}</div>
            <br />
            <h5>{currentStatus}</h5>
            {/* PENDING STATUS */}
            {currentStatus === "Pending" ? (
              <form
                className="container-fluid"
                method="POST"
                action={`/api/exchange/changingStatus/`}
              >
                <input
                  type="hidden"
                  name="exchangeIndex"
                  value={exchangeId - 1}
                />
                <input type="hidden" name="from" value="loaner" />
                <input type="hidden" name="userId" value={userData._id} />
                <button
                  className="btn btn-light text-dark border m-1"
                  type="submit"
                  name="status"
                  value="Returned"
                >
                  Returned
                </button>
                {isDateValid ? (
                  <button
                    className="btn btn-dark text-light border m-1"
                    type="submit"
                    name="status"
                    value="Not returned"
                  >
                    Not returned
                  </button>
                ) : (
                  <button
                    className="btn btn-dark text-light border m-1"
                    type="submit"
                    name="status"
                    value="Not returned"
                    disabled
                  >
                    Not returned
                  </button>
                )}
              </form>
            ) : (
              ""
            )}
          </ul>
        </>
      ) : (
        <p className="text-center">
          Nothing to display for now : the exchange you searching doesn't exist,
          or it's time to make one !{" "}
          <a className="btn btn-outline-dark border m-1" href="/create/">
            Go !
          </a>{" "}
        </p>
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
