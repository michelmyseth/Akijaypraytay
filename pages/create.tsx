import React from "react";
import { GetServerSideProps } from "next";
import { Users } from "../data/types/users";
import { Props } from "../data/types/props";
import { checkingConnection } from "../util/checkingConnection";

const Create: React.FC<Props> = ({ userData }) => {
  return (
    <div>
      <form
        className="container-fluid"
        method="POST"
        action={`/api/exchange/create/`}
      >
        <div>
          <input
            className="fst-italic rounded m-1 text-dark"
            type="text"
            name="name"
            placeholder="Name of your object"
            required
          />
        </div>
        <div>
          <input
            className="fst-italic rounded m-1 text-dark"
            type="text"
            name="description"
            placeholder="Description"
            required
          />
        </div>
        <div>
          <input
            className="fst-italic rounded m-1 text-dark"
            type="text"
            name="picture"
            placeholder="URL of your object"
            required
          />
        </div>
        <div>
          <input
            className="fst-italic rounded m-1 text-dark"
            type="text"
            name="loaner"
            placeholder="Loaner mail"
            required
          />
        </div>
        <div>
          <input
            className="fst-italic rounded m-1 text-dark"
            type="text"
            name="borrower"
            placeholder="Borrower mail"
            required
          />
        </div>
        <div>
          <input
            className="fst-italic rounded m-1 text-dark"
            type="text"
            name="returnDate"
            placeholder="Return date"
            required
          />
        </div>
        <p>
          <input
            type="hidden"
            name="_id"
            value={`${userData.exchange.length + 1}`}
          />
          <br />
          <button className="btn btn-outline-dark border m-1" type="submit">
            Submit
          </button>
        </p>
      </form>
    </div>
  );
};

export default Create;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = context.req.cookies.token;

  const checkConnectionValidity = await checkingConnection(userToken);
  // console.log("DB", checkConnectionValidity);

  return checkConnectionValidity;
};
