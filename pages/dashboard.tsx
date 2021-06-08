import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { Props } from "../data/types/props";
import { checkingConnection } from "../util/checkingConnection";
import { findingEmoji } from "../util/findingEmoji";

const Dashboard: React.FC<Props> = ({ userData }) => {
  const [isExchangesPresence, setIsExchangesPresence] =
    React.useState<boolean>(null);
  const [exchangesLength, setExchangesLength] = React.useState<number>(null);

  React.useEffect(() => {
    if (userData.exchange.length > 0) {
      setIsExchangesPresence(true);
      if (userData.exchange.length >= 3) {
        setExchangesLength(3);
      } else if (userData.exchange.length === 2) {
        setExchangesLength(2);
      } else if (userData.exchange.length === 1) {
        setExchangesLength(1);
      }
    } else {
      setIsExchangesPresence(false);
    }
  }, []);

  return (
    <div>
      <h1 className="text-center">Welcome {userData.profile.username}</h1>

      {isExchangesPresence ? (
        <div className="col-lg-12">
          <div className="card">
            <table className="table">
              <thead className="text-center">
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Item's label</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Loaner/Borrower</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {userData.exchange.reverse().map((item, index) => {
                  let isLoaner: boolean = null;
                  if (index < exchangesLength) {
                    if (
                      userData.profile.mail === userData.exchange[index].loaner
                    ) {
                      isLoaner = true;
                    } else {
                      isLoaner = false;
                    }
                    return (
                      <React.Fragment key={index + 1}>
                        <tr key={index + 1}>
                          <th scope="row">
                            {findingEmoji(item.item.category)}
                          </th>
                          <td>{item.item.name}</td>
                          <td>{item.item.description}</td>
                          <td>{item.item.category} </td>
                          <td>
                            {isLoaner
                              ? `Borrower : ${userData.exchange[index].borrower}`
                              : `Loaner : ${userData.exchange[index].loaner}`}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center">
          Nothing to display for now : it's time to go{" "}
          <Link href="/create/">create</Link> an exchange !
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
