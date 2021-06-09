import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { Props } from "../data/types/props";
import { Users, Exchange } from "../data/types/users";
import { checkingConnection } from "../util/checkingConnection";
import { findingEmoji } from "../util/findingEmoji";

const Dashboard: React.FC<Props> = ({ userData }) => {
  const [isLoanerExchangesPresence, setIsLoanerExchangesPresence] =
    React.useState<boolean>(null);
  const [isBorrowerExchangesPresence, setIsBorrowerExchangesPresence] =
    React.useState<boolean>(null);
  const [loanerExchangesLength, setLoanerExchangesLength] =
    React.useState<number>(null);
  const [borrowerExchangesLength, setBorrowerExchangesLength] =
    React.useState<number>(null);
  const [loanerData, setLoanerData] = React.useState<Exchange[]>();
  const [borrowerData, setBorrowerData] = React.useState<Exchange[]>();

  React.useEffect(() => {
    ////Loaner exchanges
    const loanerDataArray: Exchange[] = [];
    userData.exchange.reverse().filter((element: Exchange) => {
      if (element.loaner === userData.profile.mail) {
        return loanerDataArray.push(element);
      }
    });
    setLoanerData(loanerDataArray);
    if (loanerDataArray.length > 0) {
      setIsLoanerExchangesPresence(true);
      if (loanerDataArray.length >= 3) {
        setLoanerExchangesLength(3);
      } else if (loanerDataArray.length === 2) {
        setLoanerExchangesLength(2);
      } else if (loanerDataArray.length === 1) {
        setLoanerExchangesLength(1);
      }
    } else {
      setIsLoanerExchangesPresence(false);
    }
    ////Borrower exchanges
    const borrowerDataArray: Exchange[] = [];
    userData.exchange.reverse().filter((element: Exchange) => {
      if (element.loaner !== userData.profile.mail) {
        return borrowerDataArray.push(element);
      }
    });
    setBorrowerData(borrowerDataArray);
    if (borrowerDataArray.length > 0) {
      setIsBorrowerExchangesPresence(true);
      if (borrowerDataArray.length >= 3) {
        setBorrowerExchangesLength(3);
      } else if (borrowerDataArray.length === 2) {
        setBorrowerExchangesLength(2);
      } else if (borrowerDataArray.length === 1) {
        setBorrowerExchangesLength(1);
      }
    } else {
      setIsBorrowerExchangesPresence(false);
    }
  }, []);

  return (
    <div>
      <h1 className="text-center">Welcome {userData.profile.username}</h1>
      <br />
      <h2 className="text-center">Loaned</h2>
      {isLoanerExchangesPresence ? (
        <div className="col-lg-12 card">
          <table className="table">
            <tbody className="text-center">
              {loanerData.map((item, index) => {
                if (index < loanerExchangesLength) {
                  return (
                    <React.Fragment key={index + 1}>
                      <tr key={index + 1}>
                        <th scope="row">{findingEmoji(item.item.category)}</th>
                        <td>
                          <a
                            className="btn btn-outline-dark border m-1"
                            href={`/tracking/sender/${item._id}/`}
                          >
                            {item.item.name}
                          </a>
                        </td>
                        <td>{item.item.description}</td>
                        <td>{item.item.category} </td>
                        <td>{item.borrower}</td>
                      </tr>
                    </React.Fragment>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">
          Nothing to display for now : it's time to lend something !{" "}
          <a className="btn btn-outline-dark border m-1" href="/create/">
            Go !
          </a>{" "}
        </p>
      )}
      <br />
      <h2 className="text-center">Borrow</h2>
      {isBorrowerExchangesPresence ? (
        <div className="col-lg-12 card">
          <table className="table">
            <tbody className="text-center">
              {borrowerData.reverse().map((item, index) => {
                if (index < borrowerExchangesLength) {
                  return (
                    <React.Fragment key={index + 1}>
                      <tr key={index + 1}>
                        <th scope="row">{findingEmoji(item.item.category)}</th>
                        <td>
                          <a
                            className="btn btn-outline-dark border m-1"
                            href={`/tracking/sender/${item._id}/`}
                          >
                            {item.item.name}
                          </a>
                        </td>
                        <td>{item.item.description}</td>
                        <td>{item.item.category} </td>
                        <td>{item.loaner}</td>
                      </tr>
                    </React.Fragment>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">
          Nothing to display for now : it's time to borrow something !{" "}
          <a className="btn btn-outline-dark border m-1" href="/create/">
            Go !
          </a>{" "}
        </p>
      )}
    </div>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = context.req.cookies.token;

  const checkConnectionValidity = await checkingConnection(userToken);
  // console.log("DB", checkConnectionValidity);

  return checkConnectionValidity;
};
