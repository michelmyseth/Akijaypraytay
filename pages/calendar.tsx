import React from "react";
import { GetServerSideProps } from "next";
import { Users } from "../data/types/users";
import { Props } from "../data/types/props";
import { checkingConnection } from "../util/checkingConnection";

const Calendar: React.FC = () => {
  return (
    <div>
      <h1>Google Calendar 🗓</h1>
    </div>
  );
};

export default Calendar;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = context.req.cookies.token;

  const checkConnectionValidity = await checkingConnection(userToken);
  // console.log("DB", checkConnectionValidity);

  return checkConnectionValidity;
};
